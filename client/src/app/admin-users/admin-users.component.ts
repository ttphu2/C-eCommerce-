import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('search',{static: false}) searchTerm: ElementRef;
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
      console.log(this.users);
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
  onSearch(){
    const params = this.adminService.getUserParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.adminService.setUserParams(params);
    this.getUsers();
  }
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.userParams = new UserParams();
    this.adminService.setUserParams(this.userParams);
    this.getUsers();
  }
  compareDates(date: string){
    return (new Date(date)).getTime() >= (new Date()).getTime();
  }
  lockUser(id: string, option: number){
    this.adminService.lockUser(id, option).subscribe(() => {
      var index = this.users.findIndex( x => x.id == id);
      var currentDate = new Date(this.users[index].lockoutEnd);
      currentDate.setDate(currentDate.getDate() + 30);
      this.users[index].lockoutEnd = currentDate.toISOString();
    });
  }
  unlockUser(id: string){
    this.adminService.unlockUser(id).subscribe(() => {
     var index = this.users.findIndex( x => x.id == id);
     var currentDate = new Date();
     currentDate.setDate(currentDate.getDate() - 1);
     this.users[index].lockoutEnd = currentDate.toISOString();
    });
  }

}
