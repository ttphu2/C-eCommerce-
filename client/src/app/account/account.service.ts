import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // ReplaySubject có thể nhớ dc các giá trị cũ (1) là số giá trị RS nhớ dc
  // BehariorSubject với value mặc định (nếu không đặt, thì value mặc định là undefined)
  // Lý do sử dụng Replay thay vì Behavior vì khi F5 currentUserSource vẫn giữ dược giá trị
  // còn Behavior thì khi vừa mới F5 thì giá trị sẽ null rồi từ từ mới load giá trị -> bug
  private currentUserSource = new ReplaySubject<IUser>(1);
 // private currentUserSource = new BehaviorSubject<IUser>(null as any);
  currentUser$ = this.currentUserSource.asObservable();
  private isAdminSource = new ReplaySubject<boolean>(1);
  isAdmin$ = this.isAdminSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  isAdmin(token: string): boolean  {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Admin') > -1) {
        return true;
      }
    }
    return false;
  }

  loadCurrentUser(token: string){
    if (token === null) {
      this.currentUserSource.next(null as any);
      return of(null as any);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        this.isAdminSource.next(this.isAdmin(user.token));
      })
    );
}
  login(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  register(values: any){
    return this.http.post<IUser>(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);

        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null as any);
    this.router.navigateByUrl('/');
  }

  checkEmailExsits(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return  this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

}
