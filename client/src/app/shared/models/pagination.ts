import { IProduct, IWarehouse } from "./product";
import { IUser } from "./user";

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}
export class Pagination implements IPagination{
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[] = [];
}

export interface IPaginationWarehouse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IWarehouse[];
}
export class PaginationWarehouse implements IPaginationWarehouse{
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IWarehouse[] = [];
}
export interface IPaginationUser {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IUser[];
}
export class PaginationUser implements IPaginationUser{
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IUser[] = [];
}

