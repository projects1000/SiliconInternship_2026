import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  @Output() customerSaved = new EventEmitter<any>();

  customer = {
    name: '',
    mobile: ''
  };

  constructor(private toastr: ToastrService) {}

  saveCustomer() {

    if (!this.customer.name.trim()) {
      this.toastr.error('Customer Name is Required');
      return;
    }

    if (!/^[0-9]{10}$/.test(this.customer.mobile)) {
      this.toastr.error('Please Enter Valid 10 Digit Mobile Number');
      return;
    }

    this.customerSaved.emit(this.customer);

    this.toastr.success(
      `Customer '${this.customer.name}' Saved Successfully`
    );
  }
}
