import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillingService } from '../../services/billing.service';

export interface Customer {
  name: string;
  mobile: string;
}

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  @Output() customerSaved = new EventEmitter<Customer>();

  customerName: string = '';
  mobileNumber: string = '';
  private subscription!: Subscription;

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.customerName = this.billingService.customerName || '';
    this.mobileNumber = this.billingService.mobileNumber || '';

    this.subscription = this.billingService.notifications$.subscribe(msg => {
      if (msg.type === 'bill') {
        this.customerName = '';
        this.mobileNumber = '';
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  saveCustomer() {
    if (!this.customerName.trim() || !this.mobileNumber.trim()) {
      this.billingService.sendNotification('Customer Name and Mobile Number are required!', 'customer');
      return;
    }
    
    // Simple validation for 10-digit mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(this.mobileNumber)) {
      this.billingService.sendNotification('Please enter a valid 10-digit mobile number!', 'customer');
      return;
    }

    this.customerSaved.emit({
      name: this.customerName,
      mobile: this.mobileNumber
    });
    this.billingService.sendNotification('Customer Saved Successfully', 'customer');
  }
}
