import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { StatisticOrderComponent } from './statistic-order/statistic-order.component';
import { SharedModule } from '../shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';



@NgModule({
  declarations: [StatisticsComponent, StatisticOrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
