import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { StatisticOrderComponent } from './statistic-order/statistic-order.component';



const routes: Routes = [
  {path: '', component: StatisticsComponent},
  {path: 'revenue', component: StatisticOrderComponent, data: {breadcrumb: 'Revenue'}},
  {path: 'edit/:id', component: StatisticOrderComponent, data: {breadcrumb: 'Edit'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
