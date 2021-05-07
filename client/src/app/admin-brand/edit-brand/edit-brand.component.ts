import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandFormValues, IBrand } from 'src/app/shared/models/brand';
import { AdminBrandService } from '../admin-brand.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  brand: BrandFormValues;
  constructor(private adminService: AdminBrandService,
              private route: ActivatedRoute,
              private router: Router) {
      this.brand = new BrandFormValues();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'edit'){
      this.loadBrand();
    }

  }
  loadBrand() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.adminService.getBrandById(id).subscribe((response: any) => {
      this.brand = {...response};
      console.log(this.brand);
    });
  }

}
