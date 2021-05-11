import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from '../shared/models/order';
import { StatisticsService } from './statistics.service';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
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
   // this.dataSourceError.paginator = this.paginator;
//this.dataSourceError.sort = this.sort;
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
