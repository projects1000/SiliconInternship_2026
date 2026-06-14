import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product-list/product-list.component';

@Component({
  selector: 'app-nitro-billing',
  templateUrl: './nitro-billing.component.html',
  styleUrls: ['./nitro-billing.component.css']
})
export class NitroBillingComponent implements OnInit, OnDestroy {
  // Billing States
  selectedProducts: any[] = [];
  customer = {
    name: '---',
    phone: '---',
    saved: false
  };
  totalAmount = {
    subTotal: 0,
    gst: 0,
    grandTotal: 0
  };

  ngOnInit(): void {
    // Hide navigation bar of application to have a fully immersive standalone Nitro landing page
    const sidebar = document.querySelector('app-nav-bar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    if (sidebar) sidebar.style.display = 'none';
    if (content) content.style.padding = '0';
  }

  ngOnDestroy(): void {
    const sidebar = document.querySelector('app-nav-bar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    if (sidebar) sidebar.style.display = '';
    if (content) content.style.padding = '';
  }

  addProduct(product: Product): void {
    const existing = this.selectedProducts.find(p => p.name === product.name);
    
    if (existing) {
      existing.qty++;
      existing.total = existing.qty * existing.price;
    } else {
      this.selectedProducts.push({
        name: product.name,
        price: product.price,
        qty: 1,
        total: product.price
      });
    }
    
    this.calculateTotals();
  }

  saveCustomer(details: { name: string, phone: string }): void {
    this.customer = {
      name: details.name,
      phone: details.phone,
      saved: true
    };
  }

  calculateTotals(): void {
    const subTotal = this.selectedProducts.reduce((acc, p) => acc + p.total, 0);
    const gst = subTotal * 0.18;
    const grandTotal = subTotal + gst;

    this.totalAmount = {
      subTotal,
      gst,
      grandTotal
    };
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  resetOrder(): void {
    this.selectedProducts = [];
    this.customer = {
      name: '---',
      phone: '---',
      saved: false
    };
    this.totalAmount = {
      subTotal: 0,
      gst: 0,
      grandTotal: 0
    };
  }
}
