import { Component } from '@angular/core';
import { Product, CartItem, CustomerDetails } from '../models';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],
})
export class BillingDashboardComponent {
  // These variables hold the state of our entire application
  cart: CartItem[] = [];
  customer: CustomerDetails | null = null;

  subTotal: number = 0;
  gst: number = 0;
  grandTotal: number = 0;

  constructor(private notificationService: NotificationService) {}

  // 1. Listens to ProductListComponent
  handleProductAdded(product: Product) {
    // Check if the product is already in the cart
    const existingItem = this.cart.find(
      (item) => item.product.name === product.name,
    );

    if (existingItem) {
      existingItem.qty++;
      existingItem.total = existingItem.qty * existingItem.product.price;
    } else {
      // If new, push it to the cart with qty 1
      this.cart.push({ product, qty: 1, total: product.price });
    }

    // Recalculate the bill every time a product is added
    this.calculateTotals();
  }

  // 2. Listens to CustomerComponent
  handleCustomerSaved(cust: CustomerDetails) {
    this.customer = cust;
  }

  // 3. Math Logic
  calculateTotals() {
    // reduce() loops through the cart and adds up all the 'total' values
    this.subTotal = this.cart.reduce((sum, item) => sum + item.total, 0);
    this.gst = this.subTotal * 0.18; // 18% GST
    this.grandTotal = this.subTotal + this.gst;

    // Send an automated notification that the bill was updated
    if (this.grandTotal > 0) {
      this.notificationService.sendMessage({
        type: 'warning',
        message: `Bill Updated. New Total: ₹${this.grandTotal.toFixed(2)}`,
      });
    }
  }
}
