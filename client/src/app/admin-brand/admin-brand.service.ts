import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class AdminBrandService {
  baseUrl = environment.apiUrl;
  brands: IBrand[] = [];

  constructor(private http: HttpClient) { }
  getBrands(){
    // if (this.brands.length > 0)
    // {
    //   return of(this.brands);
    // }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }
  getBrandById(id: string){
    return this.http.get<IBrand>(this.baseUrl + 'brands/' + id);

  }
  createBrand( data: IBrand) {
    return this.http.post(this.baseUrl + 'brands', data);
  }
  updateBrand(id: string, data: IBrand) {
    return this.http.put(this.baseUrl + 'brands/' + id, data);
  }
  deleteBrand(id: number) {
    return this.http.delete(this.baseUrl + 'brands/' + id);
  }

}
