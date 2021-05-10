import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination, IPaginationWarehouse, Pagination, PaginationWarehouse } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { delay, map } from 'rxjs/operators';
import { ShopParams, WarehouseParams } from '../shared/models/shopParams';
import { IProduct, IProductSize, IWarehouse } from '../shared/models/product';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
// bất cứ khi nào có sự thay đổi của dữ liệu trong luồng thì phương thức subscribe sẽ được thực thi.
//
export class ShopService {
  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  warehouse: IWarehouse[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  paginationWarehouse = new PaginationWarehouse();
  shopParams = new ShopParams();
  warehouseParams = new WarehouseParams();

  constructor(private http: HttpClient) { }

  getProducts(useCache: boolean) {
    if (useCache === false ){
      this.products = [];
    }
    if (this.products?.length > 0 && useCache === true) {
      const pageReceived = Math.ceil(this.products?.length / this.shopParams.pageSize);

      console.log("page recevie" + pageReceived);
      console.log("page number" + this.shopParams.pageNumber);
      if (this.shopParams.pageNumber <= pageReceived) {
        this.pagination.data =
        this.products.slice(( this.shopParams.pageNumber - 1) * this.shopParams.pageSize
        , this.shopParams.pageNumber * this.shopParams.pageSize);
        return of(this.pagination);

      }
    }
    let params = new HttpParams();
    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }
    if (this.shopParams.typeId !== 0){
      params = params.append('typeId', this.shopParams.typeId.toString());
    }
    if (this.shopParams.search){
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        this.products = [...this.products!, ...response.body?.data! ];
        this.pagination = response.body as Pagination;
        return this.pagination;
      })
    );
  }

  getWarehouse(useCache: boolean) {
    if (useCache === false){
      this.warehouse = [];
    }
    if (this.warehouse?.length > 0 && useCache === true) {
      const pageReceived = Math.ceil(this.warehouse?.length / this.warehouseParams.pageSize);
      if (this.warehouseParams.pageNumber <= pageReceived) {
        this.paginationWarehouse.data =
        this.warehouse.slice(( this.warehouseParams.pageNumber - 1) * this.warehouseParams.pageSize
        , this.warehouseParams.pageNumber * this.warehouseParams.pageSize);
        return of(this.paginationWarehouse);

      }
    }
    let params = new HttpParams();
    if (this.warehouseParams.search){
      params = params.append('search', this.warehouseParams.search);
    }
    params = params.append('sort', this.warehouseParams.sort);
    params = params.append('pageIndex', this.warehouseParams.pageNumber.toString());
    params = params.append('pageSize', this.warehouseParams.pageSize.toString());
    return this.http.get<IPaginationWarehouse>(this.baseUrl + 'warehouse', {observe: 'response', params})
    .pipe(
      map(response => {
        this.warehouse = [...this.warehouse!, ...response.body?.data! ];
        this.paginationWarehouse = response.body as PaginationWarehouse;
        return this.paginationWarehouse;
      })
    );
  }

  setWarehouseParams(params: ShopParams) {
    this.warehouseParams = params;
  }

  getWarehouseParams() {
    return this.warehouseParams;
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }
  getProduct(id: number){
    const product = this.products?.find(p => p.id === id);
    if (product)
    {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
  getSizeOfProduct(id: number){
    const itemWithSize = this.warehouse?.find(p => p.id === id);
    if (itemWithSize)
    {
      return of(itemWithSize);
    }
    return this.http.get<IProductSize>(this.baseUrl + 'warehouse/' + id);
  }
  getBrands(){
    if (this.brands.length > 0)
    {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }
  getTypes(){
    if (this.types.length > 0)
    {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }
  getWishList(){
    return this.http.get<any[]>(this.baseUrl + 'account/wishlist').pipe(
      map(response  => {
        let productIds: number[]  = [];
        response.forEach(item => productIds.push(item.productId));
        return productIds;
      })
    );
  }
addToWishlist(productId: number){
    return this.http.put(this.baseUrl + 'account/wishlist/' + productId, null);

  }
  removeFromWishlist(productId: number){
    return this.http.delete(this.baseUrl + 'account/wishlist/' + productId);
  }

}
