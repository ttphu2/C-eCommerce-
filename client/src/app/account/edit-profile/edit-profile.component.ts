import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  currentUser$: Observable<IUser>;
  user: IUser;
  constructor(private accountService: AccountService) { }
  toggleEdit: boolean = false;
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
    })
    //user = this.accountService.currentUser$;
  }
  closeOrOpenToggleEdit(){
    console.log(true);
    this.toggleEdit = !this.toggleEdit;
  }

}
