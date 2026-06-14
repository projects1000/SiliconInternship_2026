// ============================================================
// customer-details.component.ts
// Child component — customer info form
// Demonstrates: Child → Parent Communication via @Output EventEmitter
// ============================================================

import { Component, EventEmitter, Output } from '@angular/core';
import { Customer } from '../../shared_Rohan_24bcsg13/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {

  // ✅ @Output — Emits customer data to parent when "Save Customer" clicked
  // This demonstrates Child → Parent Communication
  @Output() customerSaved = new EventEmitter<Customer>();

  customer: Customer = {
    name: '',
    mobile: '',
    address: ''
  };

  formError: string = '';
  isSaved: boolean = false;

  onSaveCustomer(): void {
    // Validate form
    if (!this.customer.name.trim()) {
      this.formError = 'Customer name is required.';
      return;
    }
    if (!this.customer.mobile.trim() || !/^\d{10}$/.test(this.customer.mobile)) {
      this.formError = 'Please enter a valid 10-digit mobile number.';
      return;
    }
    if (!this.customer.address.trim()) {
      this.formError = 'Address is required.';
      return;
    }

    this.formError = '';
    this.isSaved = true;

    // ✅ Child → Parent: emit customer data up to GamingPcBuilderComponent
    this.customerSaved.emit({ ...this.customer });
  }

  onReset(): void {
    this.customer = { name: '', mobile: '', address: '' };
    this.isSaved = false;
    this.formError = '';
  }
}
