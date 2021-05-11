import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getOrders(){
    return this.http.get<IOrder[]>(this.baseUrl + 'orders/all');
  }
}
