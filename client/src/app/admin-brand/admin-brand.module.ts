import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBrandComponent } from './admin-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { SharedModule } from '../shared/shared.module';
import { AdminBrandRoutingModule } from './admin-brand-routing.module';
import { EditBrandFormComponent } from './edit-brand-form/edit-brand-form.component';




@NgModule({
  declarations: [AdminBrandComponent, EditBrandComponent, EditBrandFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminBrandRoutingModule
  ]
})
export class AdminBrandModule { }
