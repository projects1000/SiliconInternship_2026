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
  @Output() openProducts = new EventEmitter<void>();
  @Output() exitBilling = new EventEmitter<void>();

  customer: BillingCustomer | null = null;
  customers: BillingCustomer[] = [];

  customerActivityOpen = false;
  showCustomerForm = false;

  totals: BillingTotals = this.billingService.calculateTotals([]);

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {

    this.billingService.customers$.subscribe(customers => {
      this.customers = customers;
    });

    this.billingService.customer$.subscribe(customer => {
      this.customer = customer;

      if (!customer) {
        this.customerActivityOpen = false;
      }
    });

    this.billingService.cart$.subscribe(cart => {
      this.totals = this.billingService.calculateTotals(cart);
    });

  }

  // ---------------- CUSTOMER ----------------

  openCustomerForm(): void {
    this.showCustomerForm = true;
  }

  closeCustomerForm(): void {
    this.showCustomerForm = false;
  }

  saveCustomer(customer: BillingCustomer): void {
    this.billingService.saveCustomer(customer);
    this.showCustomerForm = false;
  }

selectCustomer(customer: BillingCustomer): void {
  this.billingService.setCurrentCustomer(customer);
}

  deleteCustomer(customerId: string): void {

    this.customers = this.customers.filter(c => c.id !== customerId);

    localStorage.setItem(
      'grpE_member8_billing_customers',
      JSON.stringify(this.customers)
    );

    if (this.customer?.id === customerId) {
      this.customer = null;
      this.customerActivityOpen = false;
    }

  }

  signOutCustomer(): void {
    this.customer = null;
    this.customerActivityOpen = false;
  }

  openCustomerActivity(): void {
    if (this.customer) {
      this.openProducts.emit();
    }
  }

  // ---------------- PRODUCTS ----------------

  addProduct(product: BillingProduct): void {
    this.billingService.addProduct(product);
  }

}