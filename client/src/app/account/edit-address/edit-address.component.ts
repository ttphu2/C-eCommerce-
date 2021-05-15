import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AddressFormValues, IAddress } from 'src/app/shared/models/address';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  currentUser$: Observable<IUser>;
  user: IUser;
  addressForm: AddressFormValues;
  toggleEdit: boolean = false;
  constructor(private accountService: AccountService, private toastr: ToastrService) {
    this.addressForm = new AddressFormValues();

  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe((response: any) => {
      this.user = response;
    });
    this.getAddressFormValues();
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        this.addressForm = address as AddressFormValues;
        console.log(this.addressForm);
      }
    }, error => {
      console.log(error);
    });
  }
  onSubmit(newData: AddressFormValues) {
    this.accountService.updateUserAddress(newData)
    .subscribe((address: IAddress) => {
      this.closeOrOpenToggleEdit();
      this.toastr.success('Address saved');
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }
  closeOrOpenToggleEdit(){
    this.toggleEdit = !this.toggleEdit;
  }

}
