import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from 'src/app/shared/models/order';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: IOrder[];
  displayedColumns: string[] = ['id', 'email', 'status', 'total', 'action'];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;
  dataSource: MatTableDataSource<IOrder>;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    return this.adminService.getOrders().subscribe(response => {
      this.orders = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.tableOnePaginator;
      this.dataSource.sort = this.tableOneSort;
      console.log(this.orders);
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
