import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfileFormValues } from 'src/app/shared/models/user';
import { AdminUsersService } from '../admin-users.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {
  @Input() user: UserProfileFormValues;
  optionGender: string[] = ['Male', 'Female'];
  email: string = '';
  password: string = '';
  regEx: string = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";
  isEdit: boolean = this.route.snapshot.url[0].path === 'edit';
  constructor(private route: ActivatedRoute, private adminService: AdminUsersService,
              private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(user: UserProfileFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {

      this.adminService.updateUser(user, this.route.snapshot.paramMap.get('id')!).subscribe((response: any) => {
        this.router.navigate(['/admin-users']);
        this.toastr.success('Update user successful');
      }, error => {
        this.toastr.error(error.message);
      });
    } else {
      this.adminService.createUser(user).subscribe((response: any) => {
        this.router.navigate(['/admin-users']);
        this.toastr.success('Update user successful');
      }, error => {
        this.toastr.error(error.message);
      });
    }
  }
  updateEmail(event: any) {
    this.email = event;
  }
  updatePassword(event: any) {
    this.password = event;
  }

}
