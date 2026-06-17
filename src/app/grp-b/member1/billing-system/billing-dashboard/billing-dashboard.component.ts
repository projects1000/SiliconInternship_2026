// member1/billing-system/billing-dashboard/billing-dashboard.component.ts
import { Component } from '@angular/core';
import { Product, CartItem, Customer } from '../models/billing.model';
import { ToastrService } from 'ngx-toastr'; // Injecting toastr directly into dashboard orchestration layer

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],
})
export class BillingDashboardComponent {
  selectedCustomer: Customer = { name: '', mobile: '' };
  cartItems: CartItem[] = [];
  isDarkMode: boolean = false;

  constructor(private toastr: ToastrService) {} // Injecting service instance

  get totalProductsSelected(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  get subTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.total, 0);
  }

  get gstAmount(): number {
    return this.subTotal * 0.18;
  }

  get grandTotal(): number {
    return this.subTotal + this.gstAmount;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  onProductAdded(product: Product) {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total = existingItem.quantity * existingItem.product.price;
      this.cartItems = [...this.cartItems];
    } else {
      this.cartItems = [
        ...this.cartItems,
        { product, quantity: 1, total: product.price },
      ];
    }

    // Success Toast Notification Trigger
    this.toastr.success(
      `"${product.name}" added to bill receipt items list.`,
      'Cart Updated',
    );
  }

  onProductRemoved(product: Product) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== product.id,
    );

    // Warning/Removal Toast Notification Trigger
    this.toastr.warning(
      `"${product.name}" cleared from bill receipt items list.`,
      'Cart Updated',
    );
  }

  onCustomerSaved(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.toastr.info(
      'Customer reference file linked to order instance data.',
      'Registry Success',
    );
  }
}
