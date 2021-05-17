export interface IAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
}
export interface IAddressOrder {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
export class AddressOrderFormValues implements IAddressOrder {
  firstName: '';
  lastName: '';
  street: '';
  city: '';
  state: '';
  zipCode: '';
  constructor(init?: AddressOrderFormValues) {
    Object.assign(this, init);
  }
}
export class AddressFormValues implements IAddress {
  firstName: '';
  lastName: '';
  street: '';
  city: '';
  state: '';
  zipcode: '';
  constructor(init?: AddressFormValues) {
    Object.assign(this, init);
  }
}
