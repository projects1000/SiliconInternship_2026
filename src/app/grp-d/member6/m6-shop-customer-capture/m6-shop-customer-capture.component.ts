import { Component } from '@angular/core';
import { ShopStateService } from '../shop-state.service';

@Component({
  selector: 'app-m6-shop-customer-capture',
  templateUrl: './m6-shop-customer-capture.component.html',
  styleUrls: ['./m6-shop-customer-capture.component.css'] // Required to apply the design
})
export class M6ShopCustomerCaptureComponent {
  name = '';
  mobile = '';

  constructor(private shop: ShopStateService) {}

  save() {
    if (this.name && this.mobile) {
      this.shop.setCustomer({
        name: this.name,
        mobile: this.mobile
      });
      // Optional: Add a success message to your notify-stream
      this.shop.sendMessage(`Customer '${this.name}' Saved Successfully`);
    } else {
      alert('Please fill in all details');
    }
  }
}

