import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IBrand } from '../shared/models/brand';
import { AdminBrandService } from './admin-brand.service';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.scss']
})
export class AdminBrandComponent implements OnInit {
  brands: IBrand[];
  constructor(private brandService: AdminBrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    return this.brandService.getBrands().subscribe(response => {
      this.brands = response;
      console.log(this.brands);
    }, error => {
      console.log(error);
    });
  }
  deleteBrand(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to really delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.brandService.deleteBrand(id).subscribe((response: any) => {
          this.brands.splice(this.brands.findIndex(p => p.id === id), 1);
        });
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        );
      }
    });

  }

}
