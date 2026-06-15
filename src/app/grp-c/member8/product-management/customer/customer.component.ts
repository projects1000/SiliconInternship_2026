import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  @Output() customerSaved = new EventEmitter<any>();

  customerName = '';
  mobileNumber = '';

  saveCustomer() {

    this.customerSaved.emit({
      name: this.customerName,
      mobile: this.mobileNumber
    });

    console.log('Customer Saved');
  }
}