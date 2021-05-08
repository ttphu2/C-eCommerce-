import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IType } from '../shared/models/productType';
import { AdminTypeService } from './admin-type.service';

@Component({
  selector: 'app-admin-type',
  templateUrl: './admin-type.component.html',
  styleUrls: ['./admin-type.component.scss']
})
export class AdminTypeComponent implements OnInit {
  types: IType[];
  constructor(private typeService: AdminTypeService) { }

  ngOnInit(): void {
    this.getTypes();
  }
  getTypes() {
    return this.typeService.getTypes().subscribe(response => {
      this.types = response;
      console.log(this.types);
    }, error => {
      console.log(error);
    });
  }
  deleteType(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to really delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.typeService.deleteType(id).subscribe((response: any) => {
          this.types.splice(this.types.findIndex(p => p.id === id), 1);
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
