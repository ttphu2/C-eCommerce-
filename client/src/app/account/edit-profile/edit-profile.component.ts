import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IUser, UserProfileFormValues } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [DatePipe]
})
export class EditProfileComponent implements OnInit {

  currentUser$: Observable<IUser>;
  user: IUser;
  profileForm: UserProfileFormValues;
  optionGender: string[] = ["Male", "Female"];
  constructor(private accountService: AccountService, public datePipe: DatePipe, private toastr: ToastrService) {
    this.profileForm = new UserProfileFormValues();
   }
  toggleEdit: boolean = false;
  ngOnInit(): void {

    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe((response: any) => {
      this.user = response;
      this.profileForm = { displayName: response.displayName,
                            firstName: response.firstName,
                            lastName: response.lastName,
                            birthday: response.birthday,
                            gender: response.gender,
                            phone: response.phone};


    })
    //user = this.accountService.currentUser$;
  }
  closeOrOpenToggleEdit(){
    console.log(true);
    this.toggleEdit = !this.toggleEdit;
  }
  onSubmit(newData: UserProfileFormValues) {

    // const newProduct = {...product, price: +product.price};
    console.log(newData);
    this.accountService.updateUser(newData).subscribe((response: any) => {
      this.user = {...response};
      this.closeOrOpenToggleEdit();
      this.toastr.success("Update user profile successful");
    }, error =>{
      this.toastr.error("Update user profile failed");
    });
}

}
