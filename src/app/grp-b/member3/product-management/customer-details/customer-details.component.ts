import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerInfo } from '../models/billing.models';
import { SharedTusharService } from '../services/shared-tushar.service';

@Component({
  selector: 'app-pm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  @Output() customerSaved = new EventEmitter<CustomerInfo>();

  customerName = '';
  mobileNumber = '';
  validationMessage = '';

  constructor(private sharedService: SharedTusharService) {}

  saveCustomer(): void {
    const name = this.customerName.trim();
    const mobile = this.mobileNumber.trim();

    if (!name) {
      this.validationMessage = 'Please enter the customer name.';
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      this.validationMessage = 'Enter a valid 10-digit mobile number.';
      return;
    }

    this.validationMessage = '';
    const customer: CustomerInfo = { name, mobile };
    this.customerSaved.emit(customer);
    this.sharedService.notify('Customer details saved', 'customer');
  }
}
