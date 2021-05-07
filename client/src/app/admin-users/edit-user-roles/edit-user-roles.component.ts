import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRole } from 'src/app/shared/models/role';
import Swal from 'sweetalert2';

import { AdminUsersService } from '../admin-users.service';

@Component({
  selector: 'app-edit-user-roles',
  templateUrl: './edit-user-roles.component.html',
  styleUrls: ['./edit-user-roles.component.scss']
})
export class EditUserRolesComponent implements OnInit {
  @Input() rolesOfUser: IRole[];
  @Input() roles: IRole[];
  roleForm: string;
  isEdit: boolean = this.route.snapshot.url[0].path === 'edit';
  constructor(private route: ActivatedRoute, private adminService: AdminUsersService,
              private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }
  updateRole(event: any) {
    this.roles = event;
  }
  onSubmit(role: string) {

    let values = Object(role)["role"];
    console.log(values);
    if(this.rolesOfUser.find(x => x.name === values)){
      this.toastr.error("Role is exist in user");
      return;
    }
    if (this.route.snapshot.url[0].path === 'edit') {
      this.adminService.addRoleToUser(this.route.snapshot.paramMap.get('id')!, values).subscribe((response: any) => {
        this.rolesOfUser.push({...response});
        this.toastr.success('Update user role successful');
      }, error => {
        this.toastr.error(error.message);
      });
    }
  }
  deleteRoleOfUser(name: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to really delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteRoleOfUser(this.route.snapshot.paramMap.get('id')!, name).subscribe((response: any) => {
          this.rolesOfUser.splice(this.rolesOfUser.findIndex(p => p.name === name), 1);
        });
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        );
      }
    });

  }
  // add(){
  //   this.rolesOfUser.push({name: "Admin"});
  // }

}
