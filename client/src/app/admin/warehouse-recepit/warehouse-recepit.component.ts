import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct, ProductSizeFormValues } from 'src/app/shared/models/product';
import { ReceiptFormValues } from 'src/app/shared/models/warehouseReceipt';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-warehouse-recepit',
  templateUrl: './warehouse-recepit.component.html',
  styleUrls: ['./warehouse-recepit.component.scss']
})
export class WarehouseRecepitComponent implements OnInit {
  products: IProduct[];
  receiptForm: ReceiptFormValues;
  optionSize: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  constructor(private route: ActivatedRoute, private adminService: AdminService,
    private router: Router, private toastr: ToastrService) {
      this.receiptForm = new ReceiptFormValues();
    }

  ngOnInit(): void {
    this.getProducts();
  }
  onSubmit(newData: ReceiptFormValues) {
    console.log(newData);
    this.adminService.createReceipt(newData).subscribe((response: any) => {
      this.router.navigate(['/admin',{isWarehouse: true}]);
      this.toastr.success("Update product size successful");
    });
  }
  getProducts(useCache = false) {
    this.adminService.getAllProducts().subscribe(response => {
      this.products =  response;
    // console.log(this.products);
    }, error => {
      console.log(error);
    });
  }
  updatePrice(event: any) {
    this.receiptForm.price = event;
  }

}
