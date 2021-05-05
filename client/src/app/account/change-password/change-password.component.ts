
import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ChangePasswordFormValues, IUser, UserProfileFormValues } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentUser$: Observable<IUser>;
  user: IUser;
  formChangePassword: ChangePasswordFormValues;
  regEx: string = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";
  toggleEdit: boolean = false;
  constructor(private accountService: AccountService, private toastr: ToastrService) {
    this.formChangePassword = new ChangePasswordFormValues();
   }

  ngOnInit(): void {

    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe((response: any) => {
      this.user = response;
    })
  }
  closeOrOpenToggleEdit(){
    console.log(true);
    this.toggleEdit = !this.toggleEdit;
  }
  onSubmit(newData: ChangePasswordFormValues) {

    // const newProduct = {...product, price: +product.price};
    console.log(newData);
    this.accountService.changePassword(this.formChangePassword).subscribe((response: any) => {
      this.user = {...response};
      this.closeOrOpenToggleEdit();
      this.toastr.success("Change password successful");
    }, error =>{
      console.log(error);
      this.toastr.error("Change password failed");
    });
  }
  updatePassword(event: any) {
    this.formChangePassword.password = event;
  }

}
