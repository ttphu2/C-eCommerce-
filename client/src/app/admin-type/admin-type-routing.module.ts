import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { AdminTypeComponent } from './admin-type.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: AdminTypeComponent},
  {path: 'create', component: EditTypeComponent, data: {breadcrumb: 'Create'}},
  {path: 'edit/:id', component: EditTypeComponent, data: {breadcrumb: 'Edit'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminTypeRoutingModule { }
