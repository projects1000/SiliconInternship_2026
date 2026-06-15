import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {

  @Output()
  customerAdded = new EventEmitter<any>();

  customer = {
    name: '',
    mobile: '',
    email: '',
    city: '',
    address: ''
  };

  saveCustomer() {

    this.customerAdded.emit(this.customer);

    this.customer = {
      name: '',
      mobile: '',
      email: '',
      city: '',
      address: ''
    };

  }

}