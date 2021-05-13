import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct, IProductSize, ProductSizeFormValues } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product-sizes',
  templateUrl: './edit-product-sizes.component.html',
  styleUrls: ['./edit-product-sizes.component.scss']
})
export class EditProductSizesComponent implements OnInit {
  products: IProduct[];
  productSize: ProductSizeFormValues;
  optionSize: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  constructor(private route: ActivatedRoute, private adminService: AdminService,
              private router: Router, private toastr: ToastrService,
              private shopService: ShopService) {
                this.productSize = new ProductSizeFormValues();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'edit_size') {
      this.loadProductSize();
    }

   this.getProducts();
  }
  loadProductSize() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.shopService.getSizeOfProduct(+id).subscribe((response: any) => {

      this.productSize = {quantity: response?.quantity,
                           size: response?.size,
                            productId: response?.productId };
      console.log(this.productSize);
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
  onSubmit(newData: ProductSizeFormValues) {

      // const newProduct = {...product, price: +product.price};
      console.log(newData);
      this.adminService.createProductSize(newData).subscribe((response: any) => {
        this.router.navigate(['/admin']);
        this.toastr.success("Update product size successful");
      });
  }



}
