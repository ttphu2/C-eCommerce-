import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminUsersComponent } from './admin-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  {path: '', component: AdminUsersComponent},
  {path: 'create', component: EditUserComponent, data: {breadcrumb: 'Create'}},
  {path: 'edit/:id', component: EditUserComponent, data: {breadcrumb: 'Edit'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
