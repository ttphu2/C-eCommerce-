
export interface IType {
  id: number;
  name: string;
}
export class TypeFormValues implements IType {
  name = '';
  id: 0;
  constructor(init?: TypeFormValues) {
    Object.assign(this, init);
  }

}
