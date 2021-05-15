export interface IAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
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
