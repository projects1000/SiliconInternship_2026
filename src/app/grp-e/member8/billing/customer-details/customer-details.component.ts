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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && this.customer) {
      this.name = this.customer.name;
      this.mobile = this.customer.mobile;
      this.address = this.customer.address;
    }
  }

  saveCustomer(): void {
    if (!this.name.trim() || !this.mobile.trim() || !this.address.trim()) {
      return;
    }

    this.customerSaved.emit({
      name: this.name.trim(),
      mobile: this.mobile.trim(),
      address: this.address.trim()
    });
  }
}

