import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeFormValues } from 'src/app/shared/models/productType';
import { AdminTypeService } from '../admin-type.service';

@Component({
  selector: 'app-edit-type-form',
  templateUrl: './edit-type-form.component.html',
  styleUrls: ['./edit-type-form.component.scss']
})
export class EditTypeFormComponent implements OnInit {
  @Input() typeForm: TypeFormValues;

  constructor(private route: ActivatedRoute, private adminService: AdminTypeService,
              private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(data: TypeFormValues) {
    console.log(this.typeForm);

    if (this.route.snapshot.url[0].path === 'edit') {

      this.adminService.updateType(this.route.snapshot.paramMap.get('id')!,data).subscribe((response: any) => {
        this.router.navigate(['/admin-type']);
        this.toastr.success('Update type successful');
      }, error => {
        this.toastr.error(error.message);
      });
    } else {
      this.adminService.createType(data).subscribe((response: any) => {
        this.router.navigate(['/admin-type']);
        this.toastr.success('Create type successful');
      }, error => {
        this.toastr.error(error.message);
      });
    }
  }

}
