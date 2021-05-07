import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTypeComponent } from './admin-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';



@NgModule({
  declarations: [AdminTypeComponent, EditTypeComponent],
  imports: [
    CommonModule
  ]
})
export class AdminTypeModule { }
