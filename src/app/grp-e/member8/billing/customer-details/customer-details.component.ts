import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BillingCustomer } from '../billing.models';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnChanges {

  @Input() customer: BillingCustomer | null = null;
  @Output() customerSaved = new EventEmitter<BillingCustomer>();

  name = '';
  mobile = '';
  address = '';

  phoneError = '';

  countryCodes = [
    { name: 'India', code: '+91', length: 10 },
    { name: 'USA', code: '+1', length: 10 },
    { name: 'UK', code: '+44', length: 10 },
    { name: 'UAE', code: '+971', length: 9 },
    { name: 'Australia', code: '+61', length: 9 }
  ];

  selectedCountry = this.countryCodes[0];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && this.customer) {
      this.name = this.customer.name || '';
      this.mobile = this.customer.mobile || '';
      this.address = this.customer.address || '';
    }
  }

  // ✅ restrict input strictly
  validatePhone(): void {

    // remove non digits
    this.mobile = this.mobile.replace(/\D/g, '');

    // restrict length
    if (this.mobile.length > this.selectedCountry.length) {
      this.mobile = this.mobile.substring(0, this.selectedCountry.length);
    }

    // validation error
    if (this.mobile.length > 0 && this.mobile.length !== this.selectedCountry.length) {
      this.phoneError = `Enter ${this.selectedCountry.length} digit number only`;
    } else {
      this.phoneError = '';
    }
  }

  // ✅ unique ID generator
  generateId(name: string): string {
    const letters = name.replace(/\s/g, '').substring(0, 3).toUpperCase();
    const count = Math.floor(Math.random() * 900 + 100); // 3 digit random
    return `${letters}-${count}`;
  }

  saveCustomer(): void {

    if (!this.name.trim() || !this.mobile.trim() || !this.address.trim()) {
      alert('Please fill all fields');
      return;
    }

    if (this.mobile.length !== this.selectedCountry.length) {
      this.phoneError = `Enter valid ${this.selectedCountry.length} digit number`;
      return;
    }

    const customer: BillingCustomer = {
      id: this.generateId(this.name),   // ✅ NEW ID
      name: this.name.trim(),
      mobile: `${this.selectedCountry.code} ${this.mobile}`,
      address: this.address.trim()
    };

    this.customerSaved.emit(customer);

    // reset form
    this.name = '';
    this.mobile = '';
    this.address = '';
    this.phoneError = '';
  }
  allowOnlyNumbers(event: KeyboardEvent): void {

  const key = event.key;

  if (!/[0-9]/.test(key) &&
      key !== 'Backspace' &&
      key !== 'Delete' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight' &&
      key !== 'Tab') {

    event.preventDefault();
  }

}
}