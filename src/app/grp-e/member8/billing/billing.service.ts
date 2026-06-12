import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BillingCartItem, BillingCustomer, BillingProduct, BillingTotals } from './billing.models';

const CUSTOMER_KEY = 'grpE_member8_billing_customer';
const CART_KEY = 'grpE_member8_billing_cart';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private customerSubject = new BehaviorSubject<BillingCustomer | null>(this.readCustomer());
  private cartSubject = new BehaviorSubject<BillingCartItem[]>(this.readCart());
  private notificationsSubject = new BehaviorSubject<string[]>([]);

  customer$ = this.customerSubject.asObservable();
  cart$ = this.cartSubject.asObservable();
  notifications$ = this.notificationsSubject.asObservable();

  get customer(): BillingCustomer | null {
    return this.customerSubject.value;
  }

  get cart(): BillingCartItem[] {
    return this.cartSubject.value;
  }

  saveCustomer(customer: BillingCustomer): void {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    this.customerSubject.next(customer);
    this.addNotification('Customer saved successfully');
  }

  addProduct(product: BillingProduct): void {
    if (!this.customer) {
      this.addNotification('Please save customer details first');
      return;
    }

    const existingItem = this.cart.find(item => item.id === product.id);
    const updatedCart = existingItem
      ? this.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...this.cart, { ...product, quantity: 1 }];

    this.saveCart(updatedCart);
    this.addNotification(`${product.name} added successfully`);
  }

  removeProduct(productId: number): void {
    const updatedCart = this.cart
      .map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0);

    this.saveCart(updatedCart);
    this.addNotification('Cart updated successfully');
  }

  clearCart(): void {
    this.saveCart([]);
    this.addNotification('Cart cancelled successfully');
  }

  confirmPurchase(): void {
    if (!this.customer) {
      this.addNotification('Please save customer details first');
      return;
    }

    if (this.cart.length === 0) {
      this.addNotification('Please add products before purchase');
      return;
    }

    this.saveCart([]);
    this.addNotification('Order confirmed successfully');
    this.addNotification('Bill generated successfully');
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }

  calculateTotals(cart: BillingCartItem[] = this.cart): BillingTotals {
    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = subTotal * 0.18;

    return {
      subTotal,
      gst,
      grandTotal: subTotal + gst,
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  }

  private saveCart(cart: BillingCartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private addNotification(message: string): void {
    const messages = [message, ...this.notificationsSubject.value].slice(0, 5);
    this.notificationsSubject.next(messages);
  }

  private readCustomer(): BillingCustomer | null {
    const savedCustomer = localStorage.getItem(CUSTOMER_KEY);
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  }

  private readCart(): BillingCartItem[] {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  }
}
