export interface IWarehouseReceipt{
  description: string;
  size: number;
  price: number;
  quantity: number;
  productId: number;
}
export class ReceiptFormValues implements IWarehouseReceipt {
  description: "";
  size: 36;
  price: 0;
  quantity: 1;
  productId: number;

  constructor(init?: ReceiptFormValues) {
    Object.assign(this, init);
  }
}
