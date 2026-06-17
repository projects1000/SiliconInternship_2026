// ============================================================
// gaming-pc-builder.component.ts
// PARENT COMPONENT — Central state manager
//
// Demonstrates ALL communication patterns:
// ✅ Parent → Child via @Input (sends data TO children)
// ✅ Child → Parent via @Output EventEmitter (receives events FROM children)
// ✅ Shared Service via BehaviorSubject (NotificationService)
// ✅ Toast Notifications via ngx-toastr
// ✅ Angular Router (navigated here from member2 profile)
// ============================================================

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Product } from './shared_Rohan_24bcsg13/product.model';
import { Customer } from './shared_Rohan_24bcsg13/customer.model';
import { NotificationService } from './shared_Rohan_24bcsg13/notification.service';
import { BillingService, BillBreakdown } from './shared_Rohan_24bcsg13/billing.service';

@Component({
  selector: 'app-gaming-pc-builder',
  templateUrl: './gaming-pc-builder.component.html',
  styleUrls: ['./gaming-pc-builder.component.css']
})
export class GamingPcBuilderComponent implements OnInit {

  // =========================================================
  // STATE — Managed by PARENT, passed down via @Input
  // =========================================================

  // Selected products — passed to ProductCatalog & BillSummary via @Input
  selectedProducts: Product[] = [];

  // IDs of selected products — passed to ProductCatalog via @Input
  get selectedProductIds(): number[] {
    return this.selectedProducts.map(p => p.id);
  }

  // Currently active category filter
  selectedCategory: string = 'All';

  // Customer data — passed to BillSummary via @Input
  customer: Customer | null = null;

  // Bill breakdown — passed to BillSummary via @Input
  subtotal: number = 0;
  gstAmount: number = 0;
  grandTotal: number = 0;
  gstPercent: number = 18;
  billGenerated: boolean = false;

  // View states
  showSavedBills: boolean = false;
  isLightMode: boolean = false;

  constructor(
    private router: Router,
    // ✅ Shared Service injected in PARENT
    private notificationService: NotificationService,
    private billingService: BillingService,
    // ✅ Toast service for visual feedback
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Show toast when page loads (navigated from member2 profile)
    this.toastr.success('Gaming PC Builder Opened Successfully', 'Welcome!', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    // Log to notification service
    this.notificationService.addNotification('Gaming PC Builder opened');
  }

  // =========================================================
  // ✅ Child → Parent: Handles @Output from CategoryFilterComponent
  // =========================================================
  onCategoryChanged(category: string): void {
    this.selectedCategory = category;
  }

  // =========================================================
  // ✅ Child → Parent: Handles @Output from ProductCatalogComponent
  //    product is emitted via productSelected.emit(product)
  // =========================================================
  onProductSelected(product: Product): void {
    // Prevent duplicate additions
    if (this.selectedProductIds.includes(product.id)) {
      this.toastr.warning(`${product.name} is already in your build!`, 'Duplicate', { timeOut: 2000 });
      return;
    }

    this.selectedProducts = [...this.selectedProducts, product];
    this.recalculateBill();
    this.billGenerated = false;

    // ✅ Toast notification
    this.toastr.success(`${product.name} added!`, product.category, {
      timeOut: 2500,
      positionClass: 'toast-top-right'
    });

    // ✅ Shared Service — push to BehaviorSubject (NotificationPanel subscribes)
    this.notificationService.addNotification(`${product.category} Added: ${product.name}`);
  }

  // =========================================================
  // ✅ Child → Parent: Handles @Output productRemoved from ProductCatalog
  // =========================================================
  onProductRemoved(product: Product): void {
    this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
    this.recalculateBill();
    this.billGenerated = false;

    // ✅ Toast notification
    this.toastr.error(`${product.name} removed`, product.category, {
      timeOut: 2000,
      positionClass: 'toast-top-right'
    });

    // ✅ Shared Service
    this.notificationService.addNotification(`${product.category} Removed: ${product.name}`);
  }

  // =========================================================
  // ✅ Child → Parent: Handles @Output from CustomerDetailsComponent
  //    customer is emitted via customerSaved.emit(customer)
  // =========================================================
  onCustomerSaved(customer: Customer): void {
    this.customer = customer;
    this.billGenerated = false;

    // ✅ Toast notification
    this.toastr.info(`Customer "${customer.name}" saved!`, 'Customer Saved', {
      timeOut: 2500,
      positionClass: 'toast-top-right'
    });

    // ✅ Shared Service
    this.notificationService.addNotification(`Customer Saved: ${customer.name}`);
  }

  // =========================================================
  // Generate Bill — called when user clicks "Generate Bill"
  // =========================================================
  onGenerateBill(): void {
    if (this.selectedProducts.length === 0) {
      this.toastr.warning('Please add at least one component!', 'Empty Build', { timeOut: 2500 });
      return;
    }
    if (!this.customer) {
      this.toastr.warning('Please save customer details first!', 'No Customer', { timeOut: 2500 });
      return;
    }

    this.billGenerated = true;

    // Save to LocalStorage
    this.billingService.saveBill(
      this.customer,
      this.selectedProducts,
      {
        subtotal: this.subtotal,
        gstAmount: this.gstAmount,
        grandTotal: this.grandTotal,
        gstPercent: this.gstPercent
      }
    );

    // ✅ Toast notification
    this.toastr.success(
      `Bill of ₹${this.grandTotal.toLocaleString('en-IN')} generated and saved!`,
      'Bill Generated',
      { timeOut: 3500, positionClass: 'toast-top-right' }
    );

    // ✅ Shared Service
    this.notificationService.addNotification(
      `Bill Generated & Saved for ${this.customer.name} — ₹${this.grandTotal.toLocaleString('en-IN')}`
    );

    // Trigger Print
    setTimeout(() => {
      window.print();
      this.notificationService.addNotification('Printed Bill');
    }, 100);
  }

  // =========================================================
  // Clear Build
  // =========================================================
  onClearBuild(): void {
    this.selectedProducts = [];
    this.customer = null;
    this.subtotal = 0;
    this.gstAmount = 0;
    this.grandTotal = 0;
    this.billGenerated = false;

    this.toastr.info('Build cleared!', 'Reset', { timeOut: 2000 });
    this.notificationService.addNotification('Build cleared — started fresh');
  }

  // =========================================================
  // Navigate back to member2 profile
  // =========================================================
  goBack(): void {
    this.router.navigate(['grp-b/member2']);
    this.notificationService.addNotification('Navigated back to profile');
  }

  // =========================================================
  // View Toggles
  // =========================================================
  toggleSavedBillsView(): void {
    this.showSavedBills = !this.showSavedBills;
  }

  toggleTheme(): void {
    this.isLightMode = !this.isLightMode;
  }

  // =========================================================
  // Internal: Recalculate bill totals
  // =========================================================
  private recalculateBill(): void {
    const breakdown: BillBreakdown = this.billingService.calculateBill(this.selectedProducts);
    this.subtotal = breakdown.subtotal;
    this.gstAmount = breakdown.gstAmount;
    this.grandTotal = breakdown.grandTotal;
    this.gstPercent = breakdown.gstPercent;
  }
}
