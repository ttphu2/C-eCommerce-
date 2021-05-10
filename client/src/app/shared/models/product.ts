export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productBrand: string;
  photos: IPhoto[];
  productSizes: IProductSize[];
}
export interface IWish {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productId: number;
}
export interface IPhoto {
  id: number;
  pictureUrl: string;
  fileName: string;
  isMain: boolean;
}
export interface IProductSize {
  id: number;
  quantity: number;
  size: number;

}
export interface IProductSizeToCreate {
  quantity: number;
  size: number;
  productId: number;

}
export interface IWarehouse {
  id: number;
  quantity: number;
  size: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
}
export interface IProductToCreate {
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productTypeId: number;
  productBrandId: number;
}
export class ProductFormValues implements IProductToCreate {
  name = '';
  description = '';
  price = 0;
  pictureUrl = '';
  productBrandId: number;
  productTypeId: number;

  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
}
export class ProductSizeFormValues implements IProductSizeToCreate {

  quantity: 0;
  size: 0;
  productId: number;
  constructor(init?: ProductSizeFormValues) {
    Object.assign(this, init);
  }
}
