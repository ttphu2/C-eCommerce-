import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';
import { IProduct, IProductSize, ProductFormValues, ProductSizeFormValues } from '../shared/models/product';
import { IWarehouseReceipt, ReceiptFormValues } from '../shared/models/warehouseReceipt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createProduct(product: ProductFormValues) {
    return this.http.post<IProduct>(this.baseUrl + 'products', product);
  }

  updateProduct(product: ProductFormValues, id: number) {
    return this.http.put<IProduct>(this.baseUrl + 'products/' + id, product);
  }
  addOrUpdateProductSize(product: ProductSizeFormValues, id: number) {
    return this.http.put<IProduct>(this.baseUrl + 'products/' + id + '/size', product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }
  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.put(this.baseUrl + 'products/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  getAllProducts(){
    return this.http.get<{data: IProduct[]}>(this.baseUrl + 'products?pageSize=50').pipe(
      map(response => {
        return response.data ;
      })
      );
  }

  deleteProductPhoto(photoId: number, productId: number) {
    return this.http.delete(this.baseUrl + 'products/' + productId + '/photo/' + photoId);
  }

  setMainPhoto(photoId: number, productId: number) {
    return this.http.post<IProduct>(this.baseUrl + 'products/' + productId + '/photo/' + photoId, {});
  }
  createProductSize(product: ProductSizeFormValues) {
    return this.http.put<IProductSize>(this.baseUrl + 'warehouse', product);
  }
  createReceipt(form: ReceiptFormValues) {
    return this.http.post<IWarehouseReceipt>(this.baseUrl + 'warehouse', form);
  }
  getOrders(){
    return this.http.get<IOrder[]>(this.baseUrl + 'orders/all');
  }
}
