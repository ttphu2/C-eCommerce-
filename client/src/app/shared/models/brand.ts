export interface IBrand {
  id: number;
  name: string;
}

export class BrandFormValues implements IBrand {
  name = '';
  id: 0;
  constructor(init?: BrandFormValues) {
    Object.assign(this, init);
  }

}
