import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root'
})
export class AdminTypeService {
  baseUrl = environment.apiUrl;
  types: IType[] = [];

  constructor(private http: HttpClient) { }
  getTypes(){
    // if (this.brands.length > 0)
    // {
    //   return of(this.brands);
    // }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }
  getTypeById(id: string){
    return this.http.get<IType>(this.baseUrl + 'types/' + id);

  }
  createType( data: IType) {
    return this.http.post(this.baseUrl + 'types', data);
  }
  updateType(id: string, data: IType) {
    return this.http.put(this.baseUrl + 'types/' + id, data);
  }
  deleteType(id: number) {
    return this.http.delete(this.baseUrl + 'types/' + id);
  }
}
