import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AccountService } from '../account/account.service';
import { UserParams } from '../shared/models/shopParams';
import { IUser } from '../shared/models/user';
import { AdminUsersService } from './admin-users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: IUser[];
  totalCount: number;
  userParams: UserParams;

  constructor(private accountService: AccountService, private adminService: AdminUsersService) {
    this.userParams = this.adminService.getUserParams();
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(useCache = false) {
    this.adminService.getUsers(useCache).subscribe(response => {
      this.users = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }
  onPageChanged(event: any) {
    const params = this.adminService.getUserParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.adminService.setUserParams(params);
      this.getUsers(true);
    }
  }
  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to really delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteUser(id).subscribe((response: any) => {
          this.users.splice(this.users.findIndex(p => p.id === id), 1);
          this.totalCount--;
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
