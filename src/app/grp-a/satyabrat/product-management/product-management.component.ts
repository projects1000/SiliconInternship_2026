import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './components/product-list/product-list.component';
import { BillItem } from './components/bill-details/bill-details.component';
import { Customer } from './components/customer-details/customer-details.component';
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
export class ProductManagementComponent implements OnInit {
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

  displayedColumns: string[] = ['customerName', 'mobileNumber', 'itemsCount', 'subTotal', 'discountAmount', 'grandTotal', 'timestamp'];
  userDisplayedColumns: string[] = ['name', 'mobile', 'role'];

  constructor(
    private router: Router,
    private billingService: BillingService
  ) {}

  ngOnInit() {
    // Sync state with BillingService
    this.selectedItems = this.billingService.selectedItems;
    this.savedBills = this.billingService.savedBills;
    this.isDarkMode = this.billingService.isDarkMode;
    
    // Check if session storage or service indicates we are logged in
    this.isLoggedIn = this.billingService.isLoggedIn || sessionStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.billingService.isLoggedIn = true;
      this.customerName = this.billingService.customerName || sessionStorage.getItem('customerName') || '';
      this.mobileNumber = this.billingService.mobileNumber || sessionStorage.getItem('mobileNumber') || '';
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
      this.billingService.isReturningCustomer = this.isReturningCustomer;
    } else {
      this.customerName = '';
      this.mobileNumber = '';
      this.isRegistered = false;
      this.isReturningCustomer = false;
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
    this.billingService.sendNotification(`${product.name} added to cart`, 'product');
  }

  onItemRemoved(index: number) {
    if (index > -1 && index < this.selectedItems.length) {
      const removedItem = this.selectedItems[index];
      const updated = [...this.selectedItems];
      updated.splice(index, 1);
      this.selectedItems = updated;
      
      // Sync with service
      this.billingService.selectedItems = this.selectedItems;
      this.billingService.sendNotification(`${removedItem.name} removed from cart`, 'product');
    }
  }

  onCustomerSaved(customer: Customer) {
    // Fallback: This is not used when logged in, but kept for interface completeness
    this.customerName = customer.name;
    this.mobileNumber = customer.mobile;
    this.selectedItems = [];
    
    this.isReturningCustomer = this.savedBills.some(bill => bill.mobileNumber === customer.mobile);
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
    
    // Sync with service
    this.billingService.savedBills = this.savedBills;
    this.billingService.selectedItems = this.selectedItems;

    // Check returning status for next time (they will definitely be a returning customer now)
    this.isReturningCustomer = true;
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
    const discount = this.isReturningCustomer ? sub * 0.10 : 0;
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
    this.mobileNumber = '';
    this.isRegistered = false;
    this.isReturningCustomer = false;
    this.selectedItems = [];
    this.currentUserRole = 'customer';
    this.isAdmin = false;
    this.adminView = 'billing';

    this.billingService.customerName = '';
    this.billingService.mobileNumber = '';
    this.billingService.isRegistered = false;
    this.billingService.isReturningCustomer = false;
    this.billingService.selectedItems = [];
    this.billingService.currentUserRole = 'customer';

    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('customerName');
    sessionStorage.removeItem('mobileNumber');
    sessionStorage.removeItem('role');

    this.billingService.sendNotification('Logged out successfully.', 'bill');
  }

  goBackToProfile() {
    this.router.navigate(['/grp-a/member6']);
  }
}
