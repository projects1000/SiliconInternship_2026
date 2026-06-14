import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  DEFAULT_SETTINGS,
  GST_RATE,
  TECH_PRODUCTS
} from './constants/billing.constants';
import {
  BillLineItem,
  BillSummary,
  CategoryReport,
  CustomerInfo,
  DashboardSettings,
  Product
} from './models/billing.models';
import { SharedTusharService } from './services/shared-tushar.service';

type DashboardView = 'catalog' | 'reports' | 'settings';

interface SidebarItem {
  label: string;
  icon: string;
  view?: DashboardView;
  route?: string;
  action?: 'activity';
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  private readonly billItemsMap = new Map<number, BillLineItem>();

  readonly totalProductsAvailable = TECH_PRODUCTS.length;
  activeView: DashboardView = 'catalog';
  customerInfo: CustomerInfo | null = null;
  settings: DashboardSettings = { ...DEFAULT_SETTINGS };
  settingsSavedMessage = '';

  readonly sidebarItems: SidebarItem[] = [
    { label: 'Profile', icon: 'person', route: '/grp-b/member3' },
    { label: 'Attendance', icon: 'fact_check', route: '/grp-b/member3/attendance' },
    { label: 'Product Management', icon: 'inventory_2', view: 'catalog' },
    { label: 'Reports', icon: 'bar_chart', view: 'reports' },
    { label: 'Notifications', icon: 'notifications', action: 'activity' },
    { label: 'Settings', icon: 'settings', view: 'settings' }
  ];

  constructor(
    private router: Router,
    private sharedService: SharedTusharService
  ) {}

  get billItems(): BillLineItem[] {
    return Array.from(this.billItemsMap.values());
  }

  get billSummary(): BillSummary {
    const subtotal = this.billItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const gst = subtotal * GST_RATE;

    return {
      subtotal,
      gst,
      grandTotal: subtotal + gst
    };
  }

  get totalProductsSelected(): number {
    return this.billItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get catalogInventoryValue(): number {
    return TECH_PRODUCTS.reduce((sum, product) => sum + product.price, 0);
  }

  get categoryReports(): CategoryReport[] {
    const categories = ['Mobiles', 'Laptops', 'Headphones', 'Smartwatches', 'Tablets', 'Accessories'] as const;

    return categories.map(category => {
      const products = TECH_PRODUCTS.filter(product => product.category === category);
      return {
        category,
        count: products.length,
        totalValue: products.reduce((sum, product) => sum + product.price, 0)
      };
    });
  }

  get topProducts(): Product[] {
    return [...TECH_PRODUCTS].sort((a, b) => b.price - a.price).slice(0, 5);
  }

  get averageProductPrice(): number {
    return Math.round(this.catalogInventoryValue / this.totalProductsAvailable);
  }

  get maxCategoryValue(): number {
    return Math.max(...this.categoryReports.map(row => row.totalValue), 1);
  }

  get billReadyPercent(): number {
    let progress = 0;
    if (this.billItems.length > 0) {
      progress += 50;
    }
    if (this.customerInfo) {
      progress += 50;
    }
    return progress;
  }

  getCategoryBarPercent(value: number): number {
    return Math.round((value / this.maxCategoryValue) * 100);
  }

  goToCatalog(): void {
    this.activeView = 'catalog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isSidebarActive(item: SidebarItem): boolean {
    if (item.view) {
      return this.activeView === item.view;
    }

    return false;
  }

  onProductAdded(product: Product): void {
    const existing = this.billItemsMap.get(product.id);

    if (existing) {
      this.billItemsMap.set(product.id, {
        ...existing,
        quantity: existing.quantity + 1
      });
      return;
    }

    this.billItemsMap.set(product.id, { product, quantity: 1 });
  }

  onCustomerSaved(customer: CustomerInfo): void {
    this.customerInfo = { ...customer };
  }

  onQuantityChanged(event: { productId: number; quantity: number }): void {
    if (event.quantity <= 0) {
      this.billItemsMap.delete(event.productId);
      return;
    }

    const item = this.billItemsMap.get(event.productId);
    if (!item) {
      return;
    }

    this.billItemsMap.set(event.productId, { ...item, quantity: event.quantity });
  }

  onItemRemoved(productId: number): void {
    this.billItemsMap.delete(productId);
  }

  generateBill(): void {
    if (!this.canGenerateBill()) {
      return;
    }

    this.sharedService.notify('Bill Generated Successfully', 'bill');
  }

  canGenerateBill(): boolean {
    return this.billItems.length > 0 && !!this.customerInfo;
  }

  navigateSidebar(item: SidebarItem): void {
    if (item.action === 'activity') {
      this.activeView = 'catalog';
      setTimeout(() => {
        document.getElementById('activity-section')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    if (item.view) {
      this.activeView = item.view;
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  saveSettings(): void {
    this.settingsSavedMessage = 'Settings saved successfully.';
    this.sharedService.toastEnabled = this.settings.toastEnabled;
    this.sharedService.notify('Settings updated successfully', 'customer');
  }

  resetBill(): void {
    this.billItemsMap.clear();
    this.customerInfo = null;
    this.sharedService.notify('Bill cleared successfully', 'bill');
  }

  goBackToProfile(): void {
    this.router.navigate(['/grp-b/member3']);
  }
}
