import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, Cart } from '../shared/cart.service';
import { ToastService } from '../shared/toast.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: Cart = { items: [], totalPrice: 0, totalItems: 0 };

  deliveryCharge: number = 50;
  tax: number = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cart => {
        this.cart = cart;
        this.calculateTax();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  calculateTax(): void {
    this.tax = Math.round(this.cart.totalPrice * 0.18);
  }

  updateQuantity(productId: number, quantity: number, size?: string, color?: string): void {
    if (quantity <= 0) {
      this.removeItem(productId, size, color);
      return;
    }

    this.cartService.updateQuantity(productId, quantity, size, color);
  }

  removeItem(productId: number, size?: string, color?: string): void {
    this.cartService.removeFromCart(productId, size, color);
    this.toastService.show('Item removed from cart', 'info');
  }

  proceedToCheckout(): void {
    if (!this.cart.items.length) {
      this.toastService.show('Cart is empty', 'error');
      return;
    }

    this.router.navigate(['/grp-f/member4/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/grp-f/member4/product-list']);
  }

  getSubtotal(): number {
    return this.cart.totalPrice;
  }

  getTotal(): number {
    return this.cart.totalPrice + this.tax + this.deliveryCharge;
  }

  applyCoupon(): void {
    this.toastService.show('Coupon feature coming soon!', 'info');
  }
}