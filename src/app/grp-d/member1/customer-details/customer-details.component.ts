import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  @Output() onCustomerSave = new EventEmitter<any>();

  customerName: string = '';
  mobileNumber: string = '';

  saveProfile() {
    if (this.customerName && this.mobileNumber) {
      this.onCustomerSave.emit({
        name: this.customerName,
        mobile: this.mobileNumber
      });
    }
  }
}