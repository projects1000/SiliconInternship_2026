import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any;           // Replace 'any' with your actual Product interface if available
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  addedAt?: Date;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  lastUpdated: Date;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    totalPrice: 0,
    totalItems: 0,
    lastUpdated: new Date()
  });

  public cart$ = this.cartSubject.asObservable();

  private cart: Cart = { 
    items: [], 
    totalPrice: 0, 
    totalItems: 0, 
    lastUpdated: new Date() 
  };

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('ecom_cart');
    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart);
        this.cart.lastUpdated = new Date();
        this.updateCartTotals();
        this.cartSubject.next(this.cart);
      } catch (e) {
        console.error('Failed to load cart:', e);
        this.clearCart();
      }
    }
  }

  private saveCartToStorage(): void {
    this.cart.lastUpdated = new Date();
    localStorage.setItem('ecom_cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  addToCart(product: any, quantity: number = 1, size?: string, color?: string): void {
    const existingIndex = this.cart.items.findIndex(
      item => item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
    );

    if (existingIndex > -1) {
      this.cart.items[existingIndex].quantity += quantity;
    } else {
      this.cart.items.push({
        product,
        quantity,
        selectedSize: size,
        selectedColor: color,
        addedAt: new Date()
      });
    }

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

  removeFromCart(productId: number, size?: string, color?: string): void {
    this.cart.items = this.cart.items.filter(
      item => !(item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color)
    );
    this.updateCartTotals();
    this.saveCartToStorage();
  }

  private updateCartTotals(): void {
    this.cart.totalItems = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cart.totalPrice = this.cart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  }

  getCart(): Cart {
    return { ...this.cart }; // Return a copy to prevent direct mutation
  }

  getTotalItems(): number {
    return this.cart.totalItems;
  }

  getTotalPrice(): number {
    return this.cart.totalPrice;
  }

  clearCart(): void {
    this.cart = { 
      items: [], 
      totalPrice: 0, 
      totalItems: 0, 
      lastUpdated: new Date() 
    };
    localStorage.removeItem('ecom_cart');
    this.cartSubject.next(this.cart);
  }
  
}