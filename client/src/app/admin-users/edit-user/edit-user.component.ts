import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IRole } from 'src/app/shared/models/role';
import { IUser, UserProfileFormValues } from 'src/app/shared/models/user';
import { AdminUsersService } from '../admin-users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: IUser;
  roles: IRole[];
  rolesOfUser: IRole[];
  userFormValues: UserProfileFormValues;
  isEdit: boolean = this.route.snapshot.url[0].path === 'edit';


  constructor(private adminService: AdminUsersService,
              private route: ActivatedRoute,
              private router: Router) {
    this.userFormValues  = new UserProfileFormValues();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'edit') {
    const roles = this.getRoles();
    const rolesOfUser = this.getRolesOfUser();
    forkJoin([roles, rolesOfUser]).subscribe(results => {
      this.roles = results[0];
      this.rolesOfUser = results[1];
      console.log(results);
    }, error => {
      console.log(error);
    }, () => {
        this.loadUser();
    });
    }

  }
  loadUser() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.adminService.getUser(id).subscribe((response: any) => {
      this.user = response;
      this.userFormValues = {...response};
    });
  }
  getRoles() {
    return this.adminService.getRoles();
  }
  getRolesOfUser() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    return this.adminService.getRolesOfUser(id);
  }

}
