import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressFormValues, AddressOrderFormValues } from 'src/app/shared/models/address';
import { IOrder, IOrderItem, IOrderToAdd, OrderForm, OrderItemForm } from 'src/app/shared/models/order';
import { IProduct } from 'src/app/shared/models/product';
import { AdminService } from '../admin.service';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
export interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  options: FormGroup;
  orderForm: IOrderToAdd;
  optionSize: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'size', 'total', 'action'];
  dataSource: MatTableDataSource<IOrderItem>;


  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog, private toastr: ToastrService) {
                this.orderForm = new OrderForm();
                this.orderForm.orderItems = [];
                this.orderForm.shipToAddress = new AddressOrderFormValues();
                this.dataSource = new MatTableDataSource(this.orderForm.orderItems);



  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      height: '600px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("data is:")
      if(result){
        result.map((i: IProduct) => {
          console.log(i);
          var item = {productId: i.id,
                      productName: i.name,
                      pictureUrl: i.pictureUrl,
                      price: i.price,
                      size: 36,
                      quantity: 1};
          this.orderForm.orderItems.push(item);
        });
        this.dataSource = new MatTableDataSource(this.orderForm.orderItems);
      }


    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[1].path === 'edit') {
      this.loadOrder();
    }
  }
  loadOrder() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.adminService.getOrderById(+id).subscribe((response: any) => {
      this.orderForm = {orderItems: response.orderItems,
                        shipToAddress: {...response.shipToAddress},
                        deliveryMethodId: 1 };
      this.dataSource = new MatTableDataSource(this.orderForm.orderItems);
      console.log(this.orderForm);
     // this.product = response;
     // this.productFormValues = {...response, productBrandId, productTypeId};
    });
  }
  onSubmit(newData: IOrderToAdd) {
   console.log(this.orderForm);
   if (this.route.snapshot.url[1].path === 'edit') {
    this.adminService.updateOrder(Number(this.route.snapshot.paramMap.get('id')), this.orderForm).subscribe((response: any) => {
      this.router.navigate(['/admin/orders']);
      this.toastr.success("Update order successful");
    });
  } else {
    this.adminService.createOrder(this.orderForm).subscribe((response: any) => {
      this.router.navigate(['/admin/orders']);
      this.toastr.success("Create order successful");
    });
  }
  }
  onDeleteItem(item : IOrderItem)
  {
    this.orderForm.orderItems = this.orderForm.orderItems.filter(i => i.productId !== item.productId || (i.productId === item.productId && i.size !== item.size));
    this.dataSource = new MatTableDataSource(this.orderForm.orderItems);
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.dataSource.data.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }
}
