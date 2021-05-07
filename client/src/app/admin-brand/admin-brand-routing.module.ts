import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminBrandComponent } from './admin-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';



const routes: Routes = [
  {path: '', component: AdminBrandComponent},
  {path: 'create', component: EditBrandComponent, data: {breadcrumb: 'Create'}},
  {path: 'edit/:id', component: EditBrandComponent, data: {breadcrumb: 'Edit'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminBrandRoutingModule { }
