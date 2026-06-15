import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member3',
  templateUrl: './member3.component.html',
  styleUrls: ['./member3.component.css']
})
export class Member3Component {
  // Navigation State
  activeView: 'profile' | 'shop' | 'billing' | 'attendance' | 'chat' = 'profile';
  
  // Overlay/Sidebar State
  isChatVisible: boolean = false;
  
  // Data State
  cart: any[] = [];
  customer = { name: '', mobile: '' };
  toastMessage: string = '';
  showToast: boolean = false;
  discount: number = 0;
  couponCode: string = '';
  invoiceId: string = 'NITRO-' + Math.floor(Math.random() * 100000);

  plants = [
    { id: 1, name: 'Snake Plant', price: 299, image: 'assets/snake.jpg' },
    { id: 2, name: 'Aloe Vera', price: 199, image: 'assets/aloe.jpg' },
    { id: 3, name: 'Money Plant', price: 250, image: 'assets/money.jpg' },
    { id: 4, name: 'ZZ Plant', price: 450, image: 'assets/zz.jpg' },
    { id: 5, name: 'Peace Lily', price: 350, image: 'assets/peace.jpg' },
    { id: 6, name: 'Spider Plant', price: 220, image: 'assets/spider.jpg' }
  ];

  constructor(private router: Router) {}

  // --- ADDED THIS METHOD TO CONTROL VIEW ---
  setView(view: 'profile' | 'shop' | 'billing' | 'attendance' | 'chat'): void {
    this.activeView = view;
  }
  // ------------------------------------------

  navigateToGroupD(): void {
    this.router.navigate(['/grp-d']);
  }

  toggleChat(): void { 
    this.isChatVisible = !this.isChatVisible; 
  }

  triggerToast(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  addToCart(plant: any): void {
    this.cart.push(plant);
    this.triggerToast(`${plant.name} added to cart!`);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  getEcoScore(): number {
    let score = this.cart.length * 5;
    if (this.cart.length > 3) score += 10;
    return score;
  }

  applyCoupon(): void {
    if (this.couponCode === 'SAVE10') {
      this.discount = this.getTotal() * 0.1;
      this.triggerToast("10% Discount Applied!");
    } else {
      this.triggerToast("Invalid Coupon");
    }
  }

  getFinalTotal(): number {
    return this.getTotal() - this.discount;
  }

  saveCustomer(): void {
    if(this.customer.name && this.customer.mobile) {
      this.triggerToast("Customer details saved!");
    } else {
      this.triggerToast("Please fill in all details!");
    }
  }

  generateBill(): void {
    if (!this.customer.name || !this.customer.mobile) {
      this.triggerToast("Enter customer details first!");
      return;
    }
    
    this.triggerToast("Generating Bill...");
    setTimeout(() => {
      window.print();
      this.triggerToast("Bill Printed Successfully!");
      this.activeView = 'profile';
      this.cart = [];
      this.customer = { name: '', mobile: '' };
      this.discount = 0;
      this.couponCode = '';
    }, 500);
  }

  checkout(): void { 
    if(this.cart.length === 0) {
      this.triggerToast("Cart is empty!");
      return;
    }
    this.activeView = 'billing'; 
  }

  tips = [
    "Water your Snake Plant only when soil is dry!",
    "Keep your Money Plant in indirect sunlight.",
    "Peace Lilies love high humidity."
  ];

  getDailyTip(): string {
    return this.tips[Math.floor(Math.random() * this.tips.length)];
  }

  getSustainabilityLevel(): string {
    if (this.cart.length >= 5) return '🌿 Eco-Expert';
    if (this.cart.length >= 3) return '🌱 Eco-Friendly';
    return '🍃 Seedling';
  }
  
  goBack(): void { 
    this.activeView = 'profile'; 
  }
}