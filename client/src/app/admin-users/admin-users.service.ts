import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPaginationUser, Pagination, PaginationUser } from '../shared/models/pagination';
import { IRole } from '../shared/models/role';
import { UserParams } from '../shared/models/shopParams';
import { IUser, UserProfileFormValues } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  baseUrl = environment.apiUrl;
  users: IUser[] = [];
  roles: IRole[] = [];
  rolesOfUser: IRole[];
  pagination = new PaginationUser();
  userParams = new UserParams();
  constructor(private http: HttpClient) { }

  getUsers(useCache: boolean) {
    if (useCache === false){
      this.users = [];
    }
    if (this.users?.length > 0 && useCache === true) {
      const pageReceived = Math.ceil(this.users?.length / this.userParams.pageSize);
      if (this.userParams.pageNumber <= pageReceived) {
        this.pagination.data =
        this.users.slice(( this.userParams.pageNumber - 1) * this.userParams.pageSize
        , this.userParams.pageNumber * this.userParams.pageSize);
        return of(this.pagination);

      }
    }
    let params = new HttpParams();

    if (this.userParams.search){
      params = params.append('search', this.userParams.search);
    }

    params = params.append('sort', this.userParams.sort);
    params = params.append('pageIndex', this.userParams.pageNumber.toString());
    params = params.append('pageSize', this.userParams.pageSize.toString());
    return this.http.get<IPaginationUser>(this.baseUrl + 'account/all', {observe: 'response', params})
    .pipe(
      map(response => {
        this.users = [...this.users!, ...response.body?.data! ];
        this.pagination = response.body  as PaginationUser;
        return this.pagination;
      })
    );
  }
  getUser(id: string){
    const user = this.users?.find(p => p.id === id);
    if (user)
    {
      return of(user);
    }
    return this.http.get<IUser>(this.baseUrl + 'account/' + id);
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }
  updateUser(form: UserProfileFormValues, id: string) {
    return  this.http.put<IUser>(this.baseUrl + 'account/' + id, form);
  }
  createUser(form: UserProfileFormValues) {
    return  this.http.post<IUser>(this.baseUrl + 'account/', form);
  }
  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + 'account/' + id);
  }
  addRoleToUser(id: string, role: string) {
    return this.http.put(this.baseUrl + 'account/' + id + '/roles/' + role, null);
  }
  deleteRoleOfUser(id: string, name: string) {
    return this.http.delete(this.baseUrl + 'account/' + id + '/roles/' + name);
  }
  getUserParams() {
    return this.userParams;
  }
  getRoles(){
    if (this.roles.length > 0)
    {
      return of(this.roles);
    }
    return this.http.get<IRole[]>(this.baseUrl + 'account/roles').pipe(
      map(response => {
        //console.log(response);
        this.roles = response;
        return response;
      })
    );
  }
  getRolesOfUser(id: string){
    return this.http.get<IRole[]>(this.baseUrl + 'account/' + id + '/roles').pipe(
      map(response => {
        this.rolesOfUser = response;
        return response;
      })
    );
  }
}
