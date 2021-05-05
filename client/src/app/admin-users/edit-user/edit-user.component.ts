import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, UserProfileFormValues } from 'src/app/shared/models/user';
import { AdminUsersService } from '../admin-users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: IUser;
  userFormValues: UserProfileFormValues;


  constructor(private adminService: AdminUsersService,
              private route: ActivatedRoute,
              private router: Router) {
    this.userFormValues  = new UserProfileFormValues();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'edit') {
      this.loadUser();
    }
  }
  loadUser() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.adminService.getUser(id).subscribe((response: any) => {
      this.user = response;
      this.userFormValues = {...response};
    });
  }

}
