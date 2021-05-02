import { Component, OnInit } from '@angular/core';
import { IProduct, IWarehouse } from '../shared/models/product';
import { ShopParams, WarehouseParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: IProduct[];
  warehouse: IWarehouse[];
  totalCount: number;
  shopParams: ShopParams;
  warehouseParams: WarehouseParams;
  totalWarehouse: number;
  constructor(private shopService: ShopService, private adminService: AdminService) {
    this.shopParams = this.shopService.getShopParams();
    this.warehouseParams = this.shopService.getWarehouseParams();
   }

  ngOnInit(): void {
    this.getProducts();
    this.getWarehouse();
  }
  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }
  getWarehouse(useCache = false) {
    this.shopService.getWarehouse(useCache).subscribe(response => {
      this.warehouse = response.data;
      this.totalWarehouse = response.count;
    }, error => {
      console.log(error);
    });
  }
  onPageChangedWarehouse(event: any) {
    const params = this.shopService.getWarehouseParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setWarehouseParams(params);
      this.getWarehouse(true);
    }
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe((response: any) => {
      this.products.splice(this.products.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }

}
