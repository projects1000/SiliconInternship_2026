// member1/billing-system/components/customer-details/customer-details.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../models/billing.model';
import { BillingJagannathService as BillingSharedService } from '../../services/billing-jagannath.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent {
  @Output() customerSaved = new EventEmitter<Customer>();

  customerName: string = '';
  mobileNumber: string = '';

  constructor(private sharedService: BillingSharedService) {}

  saveCustomer() {
    if (!this.customerName || !this.mobileNumber) {
      this.sharedService.sendNotification(
        'Please fill in complete Customer profile info.',
        'warning',
      );
      return;
    }
    this.customerSaved.emit({
      name: this.customerName,
      mobile: this.mobileNumber,
    });
    this.sharedService.sendNotification(
      'Customer Record profile attached to order registry successfully!',
      'success',
    );
  }
}