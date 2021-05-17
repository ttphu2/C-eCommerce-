import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {AdminComponent} from './admin.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { EditProductSizesComponent } from './edit-product-sizes/edit-product-sizes.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import { WarehouseRecepitComponent } from './warehouse-recepit/warehouse-recepit.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'orders', component: AdminOrdersComponent, data: {breadcrumb: 'Admin Orders'}},
  {path: 'orders/edit/:id', component: EditOrderComponent, data: {breadcrumb: 'Edit Orders'}},
  {path: 'orders/create', component: EditOrderComponent, data: {breadcrumb: 'Create Orders'}},
  {path: 'create', component: EditProductComponent, data: {breadcrumb: 'Create'}},
  {path: 'edit/:id', component: EditProductComponent, data: {breadcrumb: 'Edit'}},
  {path: 'create_receipt', component: WarehouseRecepitComponent , data: {breadcrumb: 'Create Warehouse Receipt'}},
  {path: 'edit_size/:id', component: EditProductSizesComponent, data: {breadcrumb: 'Edit Size'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
