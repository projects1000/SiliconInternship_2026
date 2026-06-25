import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { Product } from './product-list/product-list.component';
import { CustomerDetails } from './customer-details/customer-details.component';
import { BillItem } from './bill-details/bill-details.component';

interface Toast {
  id: number;
  message: string;
  type: 'product' | 'customer' | 'bill' | 'warn';
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit, OnDestroy {

  // ── State ─────────────────────────────────────────────────────────────────
  selectedProducts: Map<string, BillItem> = new Map();
  customer: CustomerDetails = { name: '', mobile: '' };
  toasts: Toast[] = [];
  private toastCounter = 0;
  private notifSubscription!: Subscription;

  // ── Computed getters ──────────────────────────────────────────────────────
  get billItems(): BillItem[] {
    return Array.from(this.selectedProducts.values());
  }

  get subtotal(): number {
    return this.billItems.reduce((sum, item) => sum + item.total, 0);
  }

  get gst(): number {
    return this.subtotal * 0.18;
  }

  get grandTotal(): number {
    return this.subtotal + this.gst;
  }

  get totalProductsSelected(): number {
    return this.billItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Subscribe to notification service to drive toast notifications
    this.notifSubscription = this.notificationService.messages$.subscribe(msg => {
      this.showToast(msg.text, msg.type);
    });
  }

  ngOnDestroy(): void {
    if (this.notifSubscription) {
      this.notifSubscription.unsubscribe();
    }
  }

  // ── Product Added (@Output from ProductListComponent) ─────────────────────
  onProductAdded(product: Product): void {
    const existing = this.selectedProducts.get(product.name);
    if (existing) {
      existing.quantity += 1;
      existing.total = existing.quantity * existing.price;
      this.selectedProducts.set(product.name, { ...existing });
    } else {
      this.selectedProducts.set(product.name, {
        name: product.name,
        quantity: 1,
        price: product.price,
        total: product.price
      });
    }
    // Trigger change detection for child
    this.selectedProducts = new Map(this.selectedProducts);
  }

  // ── Customer Saved (@Output from CustomerDetailsComponent) ────────────────
  onCustomerSaved(details: CustomerDetails): void {
    this.customer = { ...details };
  }

  // ── Bill Generated (@Output from BillDetailsComponent) ───────────────────
  onBillGenerated(): void {
    // Notification service already called from BillDetailsComponent
  }

  // ── Toast System ──────────────────────────────────────────────────────────
  showToast(message: string, type: 'product' | 'customer' | 'bill' | 'warn'): void {
    const id = ++this.toastCounter;
    this.toasts.push({ id, message, type });
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 3500);
  }

  dismissToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  trackToastById(index: number, toast: Toast): number {
    return toast.id;
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  goBack(): void {
    this.router.navigate(['/grp-a/member7']);
  }
}
