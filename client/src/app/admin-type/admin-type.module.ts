import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTypeComponent } from './admin-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { AdminTypeRoutingModule } from './admin-type-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditTypeFormComponent } from './edit-type-form/edit-type-form.component';



@NgModule({
  declarations: [AdminTypeComponent, EditTypeComponent, EditTypeFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminTypeRoutingModule
  ]
})
export class AdminTypeModule { }
