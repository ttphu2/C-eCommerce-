import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeFormValues } from 'src/app/shared/models/productType';
import { AdminTypeService } from '../admin-type.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {
  type: TypeFormValues;
  constructor(private adminService: AdminTypeService,
              private route: ActivatedRoute,
              private router: Router) {
      this.type = new TypeFormValues();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'edit'){
      this.loadType();
    }

  }
  loadType() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.adminService.getTypeById(id).subscribe((response: any) => {
      this.type = {...response};
      console.log(this.type);
    });
  }

}
