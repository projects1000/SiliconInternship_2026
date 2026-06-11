import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BillingCustomer, BillingProduct, BillingTotals } from '../billing.models';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-billing-home',
  templateUrl: './billing-home.component.html',
  styleUrls: ['./billing-home.component.css']
})
export class BillingHomeComponent implements OnInit {
  @Output() openCart = new EventEmitter<void>();

  customer: BillingCustomer | null = null;
  totals: BillingTotals = this.billingService.calculateTotals([]);

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.customer$.subscribe(customer => {
      this.customer = customer;
    });

    this.billingService.cart$.subscribe(cart => {
      this.totals = this.billingService.calculateTotals(cart);
    });
  }

  saveCustomer(customer: BillingCustomer): void {
    this.billingService.saveCustomer(customer);
  }

  addProduct(product: BillingProduct): void {
    this.billingService.addProduct(product);
  }
}

