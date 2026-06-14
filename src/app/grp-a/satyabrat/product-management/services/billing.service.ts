import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NotificationMessage {
  text: string;
  type: 'product' | 'customer' | 'bill' | 'subscription';
  timestamp: Date;
}

@Injectable()
export class BillingService {
  private notificationsSubject = new Subject<NotificationMessage>();

  // Subscription feature: track how many products have been added
  private productAddedCount: number = 0;
  private readonly SUBSCRIPTION_THRESHOLD = 5;

  // Shared state variables
  selectedItems: any[] = [];
  customerName: string = '';
  mobileNumber: string = '';
  savedBills: any[] = [];
  isRegistered: boolean = false;
  isReturningCustomer: boolean = false;
  isDarkMode: boolean = false;
  isLoggedIn: boolean = false;
  currentUserRole: string = 'customer';
  registeredUsers: any[] = [];

  // Admin discount feature: product name -> discount percentage
  private productDiscountsSubject = new BehaviorSubject<{ [key: string]: number }>({});
  productDiscounts$ = this.productDiscountsSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      this.registeredUsers = JSON.parse(savedUsers);
      // Migration: Ensure default cashiers/admins have role set correctly in localStorage
      let modified = false;
      this.registeredUsers.forEach(user => {
        if (user.mobile === '9876543210' && user.role !== 'admin') {
          user.role = 'admin';
          modified = true;
        }
        if (user.mobile === '9000000000' && user.role !== 'admin') {
          user.role = 'admin';
          modified = true;
        }
      });
      if (modified) {
        localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
      }
    } else {
      this.registeredUsers = [
        { name: 'Satyabrat Sarangi', mobile: '9876543210', password: 'admin', role: 'admin' },
        { name: 'Demo Cashier', mobile: '9000000000', password: '12345', role: 'admin' }
      ];
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
    }

    // Load saved discounts from localStorage
    const savedDiscounts = localStorage.getItem('productDiscounts');
    if (savedDiscounts) {
      this.productDiscountsSubject.next(JSON.parse(savedDiscounts));
    }
  }

  get notifications$(): Observable<NotificationMessage> {
    return this.notificationsSubject.asObservable();
  }

  sendNotification(text: string, type: 'product' | 'customer' | 'bill' | 'subscription') {
    const notification: NotificationMessage = {
      text,
      type,
      timestamp: new Date()
    };
    this.notificationsSubject.next(notification);

    // Determine panel class for snackbar styling
    let panelClass = 'toast-success';
    if (type === 'product') panelClass = 'toast-product';
    if (type === 'customer') panelClass = 'toast-customer';
    if (type === 'bill') panelClass = 'toast-bill';
    if (type === 'subscription') panelClass = 'toast-subscription';

    this.snackBar.open(text, 'Close', {
      duration: type === 'subscription' ? 5000 : 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }

  // Called when a product is added to the cart.
  // Tracks the count and sends a subscription notification every 5 products.
  trackProductAdded(productName: string) {
    this.productAddedCount++;
    // Send normal product notification
    this.sendNotification(`${productName} added to cart`, 'product');

    // Every 5 products added, send a subscription milestone notification to all subscribers
    if (this.productAddedCount % this.SUBSCRIPTION_THRESHOLD === 0) {
      this.sendNotification(
        `🎉 Milestone! ${this.productAddedCount} products added to cart. Subscribers notified!`,
        'subscription'
      );
    }
  }

  // Reset the product added counter (e.g. when bill is generated or cart is cleared)
  resetProductAddedCount() {
    this.productAddedCount = 0;
  }

  // Get the current product added count
  getProductAddedCount(): number {
    return this.productAddedCount;
  }

  // ---- Admin Discount Feature ----

  // Set discount for a specific product and notify all subscribers
  setProductDiscount(productName: string, discountPercent: number) {
    const discounts = { ...this.productDiscountsSubject.value };
    if (discountPercent > 0) {
      discounts[productName] = discountPercent;
    } else {
      delete discounts[productName];
    }
    this.productDiscountsSubject.next(discounts);
    localStorage.setItem('productDiscounts', JSON.stringify(discounts));

    // Send subscription notification to all customers
    if (discountPercent > 0) {
      this.sendNotification(
        `🏷️ Today's Deal: ${discountPercent}% OFF on ${productName}!`,
        'subscription'
      );
    } else {
      this.sendNotification(
        `Discount removed from ${productName}`,
        'subscription'
      );
    }
  }

  // Get the current discount for a product
  getProductDiscount(productName: string): number {
    return this.productDiscountsSubject.value[productName] || 0;
  }

  // Get all current discounts
  getAllDiscounts(): { [key: string]: number } {
    return { ...this.productDiscountsSubject.value };
  }

  // Calculate discounted price
  getDiscountedPrice(productName: string, originalPrice: number): number {
    const discount = this.getProductDiscount(productName);
    if (discount > 0) {
      return originalPrice - (originalPrice * discount / 100);
    }
    return originalPrice;
  }

  // Clear all discounts
  clearAllDiscounts() {
    this.productDiscountsSubject.next({});
    localStorage.removeItem('productDiscounts');
    this.sendNotification('All product discounts have been cleared.', 'subscription');
  }

  // Remove a single product discount
  removeProductDiscount(productName: string) {
    const currentDiscounts = this.productDiscountsSubject.value;
    if (currentDiscounts[productName]) {
      delete currentDiscounts[productName];
      this.productDiscountsSubject.next(currentDiscounts);
      localStorage.setItem('productDiscounts', JSON.stringify(currentDiscounts));
      this.sendNotification(`Discount removed for ${productName}`, 'subscription');
    }
  }
}
