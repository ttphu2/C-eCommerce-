import { IAddress } from './address';

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
}
export interface IOrderItem1 {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
export class OrderItemForm implements IOrderItem {
  productId: number;
  productName: "";
  pictureUrl: "";
  price: 0;
  quantity: 0;

  constructor(init?: OrderItemForm) {
    Object.assign(this, init);
  }
}
