import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productservice } from './product.service';

export interface CartItem {
  product: Productservice;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    totalPrice: 0,
    totalItems: 0
  });

  public cart$ = this.cartSubject.asObservable();
  private cart: Cart = { items: [], totalPrice: 0, totalItems: 0 };

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart);
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  addToCart(product: Productservice, quantity: number = 1, size?: string, color?: string): void {
    const existingItem = this.cart.items.find(
      item => item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      });
    }

    this.updateCartTotals();
    this.saveCartToStorage();
  }

  removeFromCart(productId: number, size?: string, color?: string): void {
    this.cart.items = this.cart.items.filter(
      item => !(item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color)
    );
    this.updateCartTotals();
    this.saveCartToStorage();
  }

  updateQuantity(productId: number, quantity: number, size?: string, color?: string): void {
    const item = this.cart.items.find(
      item => item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId, size, color);
      } else {
        item.quantity = quantity;
        this.updateCartTotals();
        this.saveCartToStorage();
      }
    }
  }

  private updateCartTotals(): void {
    this.cart.totalItems = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cart.totalPrice = this.cart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
  }

  getCart(): Cart {
    return this.cart;
  }

  clearCart(): void {
    this.cart = { items: [], totalPrice: 0, totalItems: 0 };
    localStorage.removeItem('cart');
    this.saveCartToStorage();
  }

  getTotalItems(): number {
    return this.cart.totalItems;
  }

  getTotalPrice(): number {
    return this.cart.totalPrice;
  }
}
