import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

export interface CustomerDetails {
  name: string;
  mobile: string;
}

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  @Output() customerSaved = new EventEmitter<CustomerDetails>();

  customerName: string = '';
  mobileNumber: string = '';

  nameError: string = '';
  mobileError: string = '';
  isSaved: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  validate(): boolean {
    this.nameError = '';
    this.mobileError = '';
    let valid = true;

    if (!this.customerName.trim()) {
      this.nameError = 'Customer name is required';
      valid = false;
    } else if (this.customerName.trim().length < 2) {
      this.nameError = 'Name must be at least 2 characters';
      valid = false;
    }

    if (!this.mobileNumber.trim()) {
      this.mobileError = 'Mobile number is required';
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(this.mobileNumber.trim())) {
      this.mobileError = 'Enter a valid 10-digit mobile number';
      valid = false;
    }

    return valid;
  }

  saveCustomer(): void {
    if (!this.validate()) return;

    const details: CustomerDetails = {
      name: this.customerName.trim(),
      mobile: this.mobileNumber.trim()
    };

    this.customerSaved.emit(details);
    this.notificationService.sendCustomerSaved(details.name);

    this.isSaved = true;
    setTimeout(() => { this.isSaved = false; }, 2000);
  }
}
