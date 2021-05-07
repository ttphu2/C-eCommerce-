import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandFormValues, IBrand } from 'src/app/shared/models/brand';
import { AdminBrandService } from '../admin-brand.service';

@Component({
  selector: 'app-edit-brand-form',
  templateUrl: './edit-brand-form.component.html',
  styleUrls: ['./edit-brand-form.component.scss']
})
export class EditBrandFormComponent implements OnInit {
  @Input() brandForm: BrandFormValues;

  constructor(private route: ActivatedRoute, private adminService: AdminBrandService,
              private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(data: BrandFormValues) {
    console.log(this.brandForm);

    if (this.route.snapshot.url[0].path === 'edit') {

      this.adminService.updateBrand(this.route.snapshot.paramMap.get('id')!,data).subscribe((response: any) => {
        this.router.navigate(['/admin-brand']);
        this.toastr.success('Update brand successful');
      }, error => {
        this.toastr.error(error.message);
      });
    } else {
      this.adminService.createBrand(data).subscribe((response: any) => {
        this.router.navigate(['/admin-brand']);
        this.toastr.success('Create brand successful');
      }, error => {
        this.toastr.error(error.message);
      });
    }
  }


}
