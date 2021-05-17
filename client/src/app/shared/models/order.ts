import { IAddress, IAddressOrder } from './address';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: IAddress;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: IAddress;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: IOrderItem[];
  subtotal: number;
  status: string;
  total: number;
}

export interface IOrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  size: number;
}

export interface IOrderToAdd {
  orderItems: IOrderItem[];
  deliveryMethodId: number;
  shipToAddress: IAddressOrder;
}
export class OrderForm implements IOrderToAdd {
  orderItems: IOrderItem[];
  deliveryMethodId: 1;
  shipToAddress: IAddressOrder;

  constructor(init?: OrderForm) {
    Object.assign(this, init);
  }


}


export class OrderItemForm implements IOrderItem {
  productId: number;
  productName: "";
  pictureUrl: "";
  price: 0;
  quantity: 0;
  size:36;

  constructor(init?: OrderItemForm) {
    Object.assign(this, init);
  }
}
