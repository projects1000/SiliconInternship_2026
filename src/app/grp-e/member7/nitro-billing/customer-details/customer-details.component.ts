import { Component, EventEmitter, Output } from '@angular/core';
import { BillingNotificationService } from '../billing-notification.service';

@Component({
  selector: 'app-m7-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  customerName = '';
  mobileNumber = '';
  errorMessage = '';

  @Output() customerSaved = new EventEmitter<{ name: string, phone: string }>();

  constructor(private notificationService: BillingNotificationService) {}

  saveCustomer(): void {
    this.errorMessage = '';
    
    if (!this.customerName.trim()) {
      this.errorMessage = 'Please enter a valid customer name.';
      return;
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.mobileNumber)) {
      this.errorMessage = 'Please enter a valid 10-digit mobile number.';
      return;
    }

    // Emit to parent
    this.customerSaved.emit({
      name: this.customerName.trim(),
      phone: this.mobileNumber
    });

    // Notify via shared service
    this.notificationService.sendMessage('Customer Saved Successfully', 'info');
  }
}
