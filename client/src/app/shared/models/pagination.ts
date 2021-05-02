import { IProduct, IWarehouse } from "./product";

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

