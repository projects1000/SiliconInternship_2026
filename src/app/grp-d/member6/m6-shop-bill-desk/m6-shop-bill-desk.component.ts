import { Component, OnInit } from '@angular/core';
import { ShopStateService } from '../shop-state.service';

@Component({
  selector: 'app-m6-shop-bill-desk',
  templateUrl: './m6-shop-bill-desk.component.html',
  styleUrls: ['./m6-shop-bill-desk.component.css'] // Ensure this matches your CSS file name
})
export class M6ShopBillDeskComponent implements OnInit {
  products: any[] = [];
  totalAmount: number = 0;
  messages: string[] = [];

  constructor(private shop: ShopStateService) {}

  ngOnInit() {
    // Subscribe to product updates and calculate total with explicit typing
    this.shop.products$.subscribe((data: any[]) => {
      this.products = data;
      this.totalAmount = this.products.reduce((sum, p) => sum + (p.price || 0), 0);
    });

    // Subscribe to notifications
    this.shop.notification$.subscribe((msg: string) => {
      this.messages.push(msg);
      
      // Auto-clear message after 5 seconds
      setTimeout(() => {
        this.messages.shift();
      }, 5000);
    });
  }

  // New method for generating the bill
  generateBill() {
    if (this.totalAmount > 0) {
      this.shop.sendMessage(`Bill Generated! Total: ₹${this.totalAmount}`);
    } else {
      alert('Please add products to the list before generating a bill.');
    }
  }
}
