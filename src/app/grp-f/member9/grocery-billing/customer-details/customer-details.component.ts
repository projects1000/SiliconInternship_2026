import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {

  @Output()
  customerSaved = new EventEmitter<any>();

  customer = {
    name: '',
    phone: '',
    email: '',
    address: ''
  };

  saveCustomer() {
    this.customerSaved.emit({ ...this.customer });

    this.customer = {
      name: '',
      phone: '',
      email: '',
      address: ''
    };
  }

}