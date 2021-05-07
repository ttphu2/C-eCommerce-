import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedModule } from '../shared/shared.module';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { EditUserRolesComponent } from './edit-user-roles/edit-user-roles.component';



@NgModule({
  declarations: [AdminUsersComponent, EditUserComponent, EditUserFormComponent, EditUserRolesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminUsersRoutingModule
  ]
})
export class AdminUsersModule { }
