import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static: false}) searchTerm: ElementRef;
  products?: IProduct[];
  wishList: number[] = [];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];


  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
   }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
    this.getWishList();

  }
  getProducts(useCache = false){
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response!.data;
      this.totalCount = response!.count;

    }, error => {
      console.log(error);
    });
  }
  getWishList(){
    this.shopService.getWishList().subscribe(response => {
      this.wishList = response;
      console.log(this.wishList);
    }, error => {
      console.log(error);
    });
  }
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: "All"}, ...response];
    }, error => {
      console.log(error);
    });
  }
  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: "All"}, ...response];
    }, error => {
      console.log(error);
    });
  }
  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if ( params.pageNumber !== event) {

      if((event - this.shopParams.pageNumber) >= 2){
        const temp = this.shopParams.pageNumber + event -1;
        const pageNumber = this.shopParams.pageNumber;
        for (let index = pageNumber + 1; index < temp; index++) {
          params.pageNumber = index;
          this.shopService.setShopParams(params);
          this.getProducts(true);
          console.log("GET PAGE 2");
        }
      }
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }
  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
