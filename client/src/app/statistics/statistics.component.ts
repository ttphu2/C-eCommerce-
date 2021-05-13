import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from '../shared/models/order';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements AfterViewInit  {
  displayedColumns: string[] = ['id', 'email', 'status', 'total'];
  dataSourcePending: MatTableDataSource<IOrder>;
  dataSourceSuccess: MatTableDataSource<IOrder>;
  dataSourceError: MatTableDataSource<IOrder>;
  orders: IOrder[];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;

  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort;

  @ViewChild('TableThreePaginator', {static: true}) tableThreePaginator: MatPaginator;
  @ViewChild('TableThreeSort', {static: true}) tableThreeSort: MatSort;
  constructor(private statisticService: StatisticsService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  ngAfterViewInit() {

  }

getOrders() {
  return this.statisticService.getOrders().subscribe(response => {
    this.orders = response;
    this.dataSourcePending = new MatTableDataSource();
    this.dataSourceSuccess = new MatTableDataSource();
    this.dataSourceError = new MatTableDataSource();

    this.applyData();
    console.log(this.dataSourcePending.data);
    console.log(this.dataSourceSuccess.data);
    this.dataSourcePending.paginator = this.tableOnePaginator;
    this.dataSourcePending.sort = this.tableOneSort;
    this.dataSourceSuccess.paginator = this.tableTwoPaginator;
    this.dataSourceSuccess.sort = this.tableTwoSort;
    this.dataSourceError.paginator = this.tableThreePaginator;
    this.dataSourceError.sort = this.tableThreeSort;
    console.log(this.orders);
  }, error => {
    console.log(error);
  });
}
applyData(){
  this.orders.forEach((item) =>{
    if (item.status == 'Pending'){
      this.dataSourcePending.data.push(item);
    }else if (item.status == 'Payment Received'){
      this.dataSourceSuccess.data.push(item);
    }else {
      this.dataSourceError.data.push(item);
    }
  })
}



}
