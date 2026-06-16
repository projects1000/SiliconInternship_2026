// --- Naya function Clear Data ke liye ---
  import { Component, OnInit } from '@angular/core';

// Data Models (Interfaces)
export interface Product { id: number; name: string; price: number; qty?: number; }
export interface Customer { name: string; phone: string; }

@Component({
  selector: 'app-billing-parent',
  templateUrl: './billing-parent.component.html'
})
export class BillingParentComponent implements OnInit {
  
  // Available Products List (Jo Product List Child ko jayegi)
  availableProducts: Product[] = [
    { id: 1, name: 'Rice', price: 50 },
    { id: 2, name: 'Sugar', price: 45 },
    { id: 3, name: 'Oil', price: 120 },
    { id: 4, name: 'Milk', price: 60 },
    { id: 5, name: 'Eggs', price: 80 }
  ];

  // State Variables
  selectedProducts: Product[] = [];
  customer: Customer = { name: '', phone: '' };
  notificationMsg: string = '';

  // Bill Calculations
  subTotal: number = 0;
  gstAmount: number = 0;
  grandTotal: number = 0;

  ngOnInit() {
    this.loadFromLocalStorage();
    this.calculateTotals();
  }

  // 1. OUTPUT HANDLER: Jab Product List se item add hoga
  handleProductAdded(product: Product) {
    const existing = this.selectedProducts.find(p => p.id === product.id);
    if (existing) {
      existing.qty = (existing.qty || 0) + 1; // Agar pehle se hai toh quantity badhao
    } else {
      this.selectedProducts.push({ ...product, qty: 1 }); // Naya product add karo
    }
    this.calculateTotals();
    this.saveToLocalStorage();
    this.showNotification(`✔️ Product '${product.name}' Added Successfully`);
  }

  // 2. OUTPUT HANDLER: Jab Customer Details se save click hoga
  handleCustomerSaved(custDetails: Customer) {
    this.customer = custDetails;
    this.saveToLocalStorage();
    this.showNotification('✔️ Customer Saved Successfully');
  }

  // Bill Calculation Logic
  calculateTotals() {
    this.subTotal = this.selectedProducts.reduce((sum, p) => sum + (p.price * (p.qty || 1)), 0);
    this.gstAmount = parseFloat((this.subTotal * 0.18).toFixed(2)); // 18% GST
    this.grandTotal = this.subTotal + this.gstAmount;
  }

  // Notification Logic (3 seconds baad automatic gayab hoga)
  showNotification(msg: string) {
    this.notificationMsg = msg;
    setTimeout(() => this.notificationMsg = '', 3000); 
  }

  // --- Local Storage Implementation (CRUD) ---
  saveToLocalStorage() {
    const data = {
      products: this.selectedProducts,
      customer: this.customer
    };
    localStorage.setItem('billing_dashboard_data', JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem('billing_dashboard_data');
    if (saved) {
      const data = JSON.parse(saved);
      this.selectedProducts = data.products || [];
      this.customer = data.customer || { name: '', phone: '' };
    }
  }

  // --- Naya function Clear Data / New Customer ke liye ---
  resetDashboard() {
    if (confirm('Kya aap naye customer ke liye sabhi data clear karna chahte hain?')) {
      this.selectedProducts = [];
      this.customer = { name: '', phone: '' };
      this.calculateTotals();
      this.saveToLocalStorage(); // Local storage bhi khali ho jayega
      this.showNotification('🔄 System Reset for New Customer');
    }
  }
}