import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product, ProductListComponent } from './components/product-list/product-list.component';
import { BillItem } from './components/bill-details/bill-details.component';
import { Customer, CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { BillingService } from './services/billing.service';

export interface SavedBill {
  customerName: string;
  mobileNumber: string;
  items: BillItem[];
  subTotal: number;
  discountAmount: number;
  gstAmount: number;
  grandTotal: number;
  timestamp: Date;
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  selectedItems: BillItem[] = [];
  customerName: string = '';
  mobileNumber: string = '';
  savedBills: SavedBill[] = [];
  
  isRegistered: boolean = false;
  isReturningCustomer: boolean = false;
  isDarkMode: boolean = false;
  isLoggedIn: boolean = false;

  currentUserRole: string = 'customer';
  isAdmin: boolean = false;
  adminView: 'billing' | 'management' = 'billing';

  // Admin Discount feature
  discountProductName: string = '';
  discountPercentage: number | null = null;
  activeDiscounts: { [key: string]: number } = {};
  showInfoPanel: boolean = false;

  // BehaviorSubjects for data flow using Observables
  selectedItems$ = new BehaviorSubject<BillItem[]>([]);
  customerName$ = new BehaviorSubject<string>('');
  mobileNumber$ = new BehaviorSubject<string>('');
  isReturningCustomer$ = new BehaviorSubject<boolean>(false);

  private customerSubscription?: Subscription;

  @ViewChild(CustomerDetailsComponent) set customerDetails(component: CustomerDetailsComponent | undefined) {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
      this.customerSubscription = undefined;
    }
    if (component) {
      this.customerSubscription = component.customerSaved.subscribe(customer => {
        this.onCustomerSaved(customer);
      });
    }
  }

  displayedColumns: string[] = ['customerName', 'mobileNumber', 'itemsCount', 'subTotal', 'grandTotal', 'timestamp'];
  userDisplayedColumns: string[] = ['name', 'mobile', 'role'];

  constructor(
    private router: Router,
    private billingService: BillingService
  ) {}

  ngOnInit() {
    // Sync state with BillingService
    this.selectedItems = this.billingService.selectedItems;
    this.selectedItems$.next(this.selectedItems);
    this.savedBills = this.billingService.savedBills;
    this.isDarkMode = this.billingService.isDarkMode;
    
    // Subscribe to discounts
    this.billingService.productDiscounts$.subscribe(discounts => {
      this.activeDiscounts = discounts;
    });
    
    // Check if session storage or service indicates we are logged in
    this.isLoggedIn = this.billingService.isLoggedIn || sessionStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.billingService.isLoggedIn = true;
      this.customerName = this.billingService.customerName || sessionStorage.getItem('customerName') || '';
      this.customerName$.next(this.customerName);
      this.mobileNumber = this.billingService.mobileNumber || sessionStorage.getItem('mobileNumber') || '';
      this.mobileNumber$.next(this.mobileNumber);
      this.currentUserRole = this.billingService.currentUserRole || sessionStorage.getItem('role') || 'customer';
      
      this.billingService.customerName = this.customerName;
      this.billingService.mobileNumber = this.mobileNumber;
      this.billingService.currentUserRole = this.currentUserRole;
      this.isRegistered = true;
      this.billingService.isRegistered = true;
      
      this.isAdmin = this.currentUserRole === 'admin' || this.mobileNumber === '9876543210' || this.mobileNumber === '9000000000';
      if (this.isAdmin) {
        this.currentUserRole = 'admin';
        this.billingService.currentUserRole = 'admin';
        sessionStorage.setItem('role', 'admin');
      }
      
      // Auto detect if they have past bills for the returning discount
      this.isReturningCustomer = this.savedBills.some(bill => bill.mobileNumber === this.mobileNumber);
      this.isReturningCustomer$.next(this.isReturningCustomer);
      this.billingService.isReturningCustomer = this.isReturningCustomer;
    } else {
      this.customerName = '';
      this.customerName$.next('');
      this.mobileNumber = '';
      this.mobileNumber$.next('');
      this.isRegistered = false;
      this.isReturningCustomer = false;
      this.isReturningCustomer$.next(false);
      this.currentUserRole = 'customer';
      this.isAdmin = false;
      this.adminView = 'billing';
    }
  }

  onProductAdded(product: Product) {
    const existingIndex = this.selectedItems.findIndex(item => item.name === product.name);
    
    if (existingIndex > -1) {
      const updated = [...this.selectedItems];
      updated[existingIndex].qty += 1;
      updated[existingIndex].total = updated[existingIndex].qty * updated[existingIndex].price;
      this.selectedItems = updated;
    } else {
      this.selectedItems = [
        ...this.selectedItems,
        {
          name: product.name,
          qty: 1,
          price: product.price,
          total: product.price,
          image: product.image
        }
      ];
    }
    
    // Sync with service
    this.billingService.selectedItems = this.selectedItems;
    this.selectedItems$.next(this.selectedItems);
    this.billingService.trackProductAdded(product.name);
  }

  onItemRemoved(index: number) {
    if (index > -1 && index < this.selectedItems.length) {
      const removedItem = this.selectedItems[index];
      const updated = [...this.selectedItems];
      updated.splice(index, 1);
      this.selectedItems = updated;
      
      // Sync with service
      this.billingService.selectedItems = this.selectedItems;
      this.selectedItems$.next(this.selectedItems);
      this.billingService.sendNotification(`${removedItem.name} removed from cart`, 'product');
    }
  }

  increaseItemQuantity(index: number) {
    if (index > -1 && index < this.selectedItems.length) {
      const updated = [...this.selectedItems];
      updated[index].qty += 1;
      updated[index].total = updated[index].qty * updated[index].price;
      this.selectedItems = updated;
      this.billingService.selectedItems = this.selectedItems;
      this.selectedItems$.next(this.selectedItems);
    }
  }

  decreaseItemQuantity(index: number) {
    if (index > -1 && index < this.selectedItems.length) {
      const updated = [...this.selectedItems];
      if (updated[index].qty > 1) {
        updated[index].qty -= 1;
        updated[index].total = updated[index].qty * updated[index].price;
        this.selectedItems = updated;
        this.billingService.selectedItems = this.selectedItems;
        this.selectedItems$.next(this.selectedItems);
      } else {
        // If qty becomes 0, we can remove it entirely
        this.onItemRemoved(index);
      }
    }
  }

  onCustomerSaved(customer: Customer) {
    // Fallback: This is not used when logged in, but kept for interface completeness
    this.customerName = customer.name;
    this.customerName$.next(this.customerName);
    this.mobileNumber = customer.mobile;
    this.mobileNumber$.next(this.mobileNumber);
    this.selectedItems = [];
    this.selectedItems$.next([]);
    
    this.isReturningCustomer = this.savedBills.some(bill => bill.mobileNumber === customer.mobile);
    this.isReturningCustomer$.next(this.isReturningCustomer);
    this.isRegistered = true;
    
    // Sync with service
    this.billingService.customerName = this.customerName;
    this.billingService.mobileNumber = this.mobileNumber;
    this.billingService.selectedItems = this.selectedItems;
    this.billingService.isReturningCustomer = this.isReturningCustomer;
    this.billingService.isRegistered = this.isRegistered;
  }

  onBillGenerated(bill: any) {
    this.savedBills = [
      ...this.savedBills,
      {
        ...bill,
        timestamp: new Date()
      }
    ];
    
    // Only reset the active cart, keep customer info logged in
    this.selectedItems = [];
    this.selectedItems$.next([]);

    // Reset subscription product counter on bill generation
    this.billingService.resetProductAddedCount();
    
    // Sync with service
    this.billingService.savedBills = this.savedBills;
    this.billingService.selectedItems = this.selectedItems;

    // Check returning status for next time (they will definitely be a returning customer now)
    this.isReturningCustomer = true;
    this.isReturningCustomer$.next(true);
    this.billingService.isReturningCustomer = true;
  }

  get displayedSavedBills(): SavedBill[] {
    if (this.isAdmin) {
      return this.savedBills;
    }
    return this.savedBills.filter(bill => bill.mobileNumber === this.mobileNumber);
  }

  get registeredUsers(): any[] {
    return this.billingService.registeredUsers;
  }

  get totalAllTimeRevenue(): number {
    return this.savedBills.reduce((sum, bill) => sum + bill.grandTotal, 0);
  }

  get averageOrderValue(): number {
    if (this.savedBills.length === 0) return 0;
    return this.totalAllTimeRevenue / this.savedBills.length;
  }

  get topSellingProducts(): { name: string; qty: number }[] {
    const counts: { [key: string]: number } = {};
    this.savedBills.forEach(bill => {
      bill.items.forEach(item => {
        counts[item.name] = (counts[item.name] || 0) + item.qty;
      });
    });
    return Object.keys(counts)
      .map(name => ({ name, qty: counts[name] }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 3);
  }

  get dailyRevenue(): number {
    const todayStr = new Date().toDateString();
    return this.savedBills
      .filter(bill => new Date(bill.timestamp).toDateString() === todayStr)
      .reduce((sum, bill) => sum + bill.grandTotal, 0);
  }

  get dailyOrderCount(): number {
    const todayStr = new Date().toDateString();
    return this.savedBills.filter(bill => new Date(bill.timestamp).toDateString() === todayStr).length;
  }

  get dailyCustomerCount(): number {
    const todayStr = new Date().toDateString();
    const mobiles = this.savedBills
      .filter(bill => new Date(bill.timestamp).toDateString() === todayStr)
      .map(bill => bill.mobileNumber);
    return new Set(mobiles).size;
  }

  get totalProductsSelected(): number {
    return this.selectedItems.reduce((sum, item) => sum + item.qty, 0);
  }

  get subTotal(): number {
    return this.selectedItems.reduce((sum, item) => sum + item.total, 0);
  }

  get totalBillAmount(): number {
    const sub = this.subTotal;
    const discount = 0; // Discount not given financially
    const taxable = sub - discount;
    return taxable + (taxable * 0.18); // Including 18% GST after discount
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.billingService.isDarkMode = this.isDarkMode;
  }

  goToLogin() {
    this.router.navigate(['/grp-a/member6/attendance/product-management/login']);
  }

  logout() {
    this.billingService.isLoggedIn = false;
    this.isLoggedIn = false;
    this.customerName = '';
    this.customerName$.next('');
    this.mobileNumber = '';
    this.mobileNumber$.next('');
    this.isRegistered = false;
    this.isReturningCustomer = false;
    this.isReturningCustomer$.next(false);
    this.selectedItems = [];
    this.selectedItems$.next([]);
    this.currentUserRole = 'customer';
    this.isAdmin = false;
    this.adminView = 'billing';

    this.billingService.customerName = '';
    this.billingService.mobileNumber = '';
    this.billingService.isRegistered = false;
    this.billingService.isReturningCustomer = false;
    this.billingService.selectedItems = [];
    this.billingService.currentUserRole = 'customer';
    this.billingService.resetProductAddedCount();

    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('customerName');
    sessionStorage.removeItem('mobileNumber');
    sessionStorage.removeItem('role');

    this.billingService.sendNotification('Logged out successfully.', 'bill');
  }

  goBackToProfile() {
    this.router.navigate(['/grp-a/member6']);
  }

  // --- Admin Discount Management ---
  applyDiscount() {
    if (!this.discountProductName || !this.discountPercentage || this.discountPercentage <= 0) {
      this.billingService.sendNotification('Please provide a valid product name and discount percentage.', 'product');
      return;
    }
    this.billingService.setProductDiscount(this.discountProductName.trim(), this.discountPercentage);
    this.discountProductName = '';
    this.discountPercentage = null;
  }

  clearAllDiscounts() {
    this.billingService.clearAllDiscounts();
  }

  removeDiscount(productName: string) {
    this.billingService.removeProductDiscount(productName);
  }

  ngOnDestroy() {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }
}
