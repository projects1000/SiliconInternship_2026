import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BillingCartItem, BillingCustomer, BillingTotals } from '../billing.models';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-billing-cart',
  templateUrl: './billing-cart.component.html',
  styleUrls: ['./billing-cart.component.css']
})
export class BillingCartComponent implements OnInit {
  @Output() backToBilling = new EventEmitter<void>();

  customer: BillingCustomer | null = null;
  cart: BillingCartItem[] = [];
  totals: BillingTotals = this.billingService.calculateTotals([]);
  orderConfirmed = false;

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.customer$.subscribe(customer => {
      this.customer = customer;
    });

    this.billingService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totals = this.billingService.calculateTotals(cart);
    });
  }

  removeItem(productId: number): void {
    this.billingService.removeProduct(productId);
  }

  cancelOrder(): void {
    this.billingService.clearCart();
    this.orderConfirmed = false;
  }

  purchase(): void {
    if (this.cart.length === 0 || !this.customer) {
      this.billingService.confirmPurchase();
      return;
    }

    this.orderConfirmed = true;
    this.billingService.confirmPurchase();
  }
}

