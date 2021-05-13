import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { EditProductPhotosComponent } from './edit-product-photos/edit-product-photos.component';
import { EditProductSizesComponent } from './edit-product-sizes/edit-product-sizes.component';
import { WarehouseRecepitComponent } from './warehouse-recepit/warehouse-recepit.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';



@NgModule({
  declarations: [AdminComponent, EditProductComponent, EditProductFormComponent, EditProductPhotosComponent, EditProductSizesComponent, WarehouseRecepitComponent, AdminOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
