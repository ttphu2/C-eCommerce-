import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBasket, IBasketItem, Basket, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null as any);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null as any);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;


  constructor(private http: HttpClient) { }

  createPaymentIntent(){
    return this.http.post<IBasket>(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {})
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.shipping = basket.shippingPrice!;
        console.log(this.getCurrentBasketValue());
      })
    );
  }
  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.shipping = deliveryMethod.price;
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }
  deleteLocalBasket(id: string) {
    this.basketSource.next(null as any);
    this.basketTotalSource.next(null as any);
    localStorage.removeItem('basket_id');
  }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }
  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }
  getCurrentBasketValue(){
    return this.basketSource.value;
  }
  checkStockProductInBasket(item: IProduct, quantity = 1, size: number, maxStock: number): boolean
  {
    const basket = this.getCurrentBasketValue();
    if (basket)
    {
      var temp = basket.items.find(x => x.id == item.id && x.size == size);
      if (temp)
      {
        if (quantity + temp.quantity > maxStock)
        {
          return false;
        }
      }
      return true;
    }
    return true;
  }
  addItemToBasket(item: IProduct, quantity = 1, size: number){
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity, size); // map data

    // Neu chua co gio hang thi tao moi
    // tuong duong code
    // getCurrentBasketValue() !== null && getCurrentBasketValue() !== undefined ? getCurrentBasketValue() : this.createBasket()
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    console.log(basket);
    // Kiem tra neu item da co trong gio hang thi` tang so luong nguoc lai them moi
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity, size);
    this.setBasket(basket);

  }
  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id && x.size === item.size);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }
  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id && x.size === item.size);
    if (basket.items[foundItemIndex].quantity > 1){
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }

  }
  removeItemFromBasket(item: IBasketItem) {
    console.log(item);
    const basket = this.getCurrentBasketValue();
    // some kiem tra phan tu co ton` tai trong mang ko return true neu co phan tu thoa dk
    if (basket.items.some(x => x.id === item.id && x.size === item.size)) {
      basket.items = basket.items.filter(i => i.id !== item.id || (i.id === item.id && i.size !== item.size));
      if (basket.items.length > 0){
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null as any);
      this.basketTotalSource.next(null as any);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }
  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    console.log(total);
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number, size: number): IBasketItem[] {
    console.log(items);
    const index = items.findIndex(i => i.id === itemToAdd.id && i.size === itemToAdd.size);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  mapProductItemToBasketItem(item: IProduct, quantity: number, sizeProduct: number): IBasketItem {
   return {
     id: item.id,
     productName: item.name,
     price: item.price,
     pictureUrl: item.pictureUrl,
     quantity,
     size: sizeProduct,
     brand: item.productBrand,
     type: item.productType
   };
  }
}
