import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { EditAddressComponent } from './edit-address/edit-address.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, EditProfileComponent, ChangePasswordComponent, WishlistComponent, EditAddressComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
