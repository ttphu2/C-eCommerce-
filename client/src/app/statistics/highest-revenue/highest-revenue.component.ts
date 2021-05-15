import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { IOrder, IOrderItem } from 'src/app/shared/models/order';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-highest-revenue',
  templateUrl: './highest-revenue.component.html',
  styleUrls: ['./highest-revenue.component.scss']
})
export class HighestRevenueComponent implements OnInit {
  displayedColumns = ['name', 'quantity','price','cost'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  daterangepickerModel: Date[];
  dataSource: MatTableDataSource<IOrderItem>;

  orders: IOrder[];
  //pie chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet = [30, 50, 20,10,10];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  //end pie chart
  constructor(private statisticService: StatisticsService) {
    this.orders = [];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    //this.getOrders();

  }
  //stripe listen -f https://localhost:5001/api/payments/webhook
  filterDataTable(){

    let listItem: IOrderItem[] = [];
    this.pieChartLabels = [];

    this.orders.forEach(x =>{
     if (x.status == "Payment Received") {
      x.orderItems.forEach(i => {
        let temp = listItem.findIndex(j => j.productId == i.productId);
        if (temp != -1)
        {
          listItem[temp].quantity = listItem[temp].quantity + i.quantity;
        } else {
          listItem.push(i);
        }
      });
     }

   });
    listItem.sort((a, b) => b.quantity*b.price - a.quantity*a.price);
    this.pieChartData=[];
    listItem.slice(0,5).filter(x => {
    this.pieChartLabels.push(x.productName);
    this.pieChartData.push(x.quantity*x.price);
   });
    this.dataSource = new MatTableDataSource(listItem);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(listItem);
  }

  getOrders() {
    return this.statisticService.getOrders().subscribe(response => {
      this.orders = response;
      this.onSubmit();
    }, error => {
      console.log(error);
    });
  }
   daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  onSubmit(){


    if(Array.isArray(this.daterangepickerModel)){
      console.log(this.orders);
      this.orders   = this.orders.filter((item: any) =>
      (new Date(item.orderDate)).getTime() >= this.daterangepickerModel[0].getTime()
      && (new Date(item.orderDate)).getTime() <= this.daterangepickerModel[1].getTime()
      );
    }
    this.filterDataTable();

  }

}
