import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { IOrder } from 'src/app/shared/models/order';
import { StatisticsService } from '../statistics.service';
export interface Transaction {
  item: string;
  cost: number;
  date: Date;
}
@Component({
  selector: 'app-statistic-order',
  templateUrl: './statistic-order.component.html',
  styleUrls: ['./statistic-order.component.scss']
})
export class StatisticOrderComponent implements OnInit {
  displayedColumns = ['item', 'email', 'orderDate', 'cost'];
  footer = ['item', 'cost'];
  transactions: IOrder[] = [];
  orders: IOrder[];
  daterangepickerModel: Date[];
  datepickerModel: Date;
  radioModel = 'month';

  constructor(private statisticService: StatisticsService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getTotalCost() {
    return this.transactions.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }
  getOrders() {
    return this.statisticService.getOrders().subscribe(response => {
      this.orders = response;
      this.transactions = response;

      console.log(this.orders);
    }, error => {
      console.log(error);
    });
  }
   daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  onSubmit(){

    if (this.radioModel === 'month')
    {
      const firstDay = new Date(this.datepickerModel.getFullYear(),
      this.datepickerModel.getMonth(), 1);

      const lastDay = new Date(this.datepickerModel.getFullYear(),
      this.datepickerModel.getMonth(), this.daysInMonth(this.datepickerModel.getMonth() + 1,
      this.datepickerModel.getFullYear()));
      this.transactions = this.orders.filter((item: any) =>
      (new Date(item.orderDate)).getTime() >= firstDay.getTime() && (new Date(item.orderDate)).getTime() <= lastDay.getTime());
      return;
    }
    this.transactions = this.orders.filter((item: any) =>
    (new Date(item.orderDate)).getTime() >= this.daterangepickerModel[0].getTime()
    && (new Date(item.orderDate)).getTime() <= this.daterangepickerModel[1].getTime()
  );

  }
}
