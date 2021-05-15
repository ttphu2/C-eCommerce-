import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { StatisticOrderComponent } from './statistic-order/statistic-order.component';
import { SharedModule } from '../shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { HighestRevenueComponent } from './highest-revenue/highest-revenue.component';



@NgModule({
  declarations: [StatisticsComponent, StatisticOrderComponent, BestSellingComponent, HighestRevenueComponent],
  imports: [
    CommonModule,
    SharedModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
