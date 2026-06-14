import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Product {
  name: string;
  price: number;
  icon: string;
}

interface BillItem extends Product {
  qty: number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  activeTab: 'products' | 'customer' | 'bill' = 'products';

  catalogue: Product[] = [
    { name: 'Rice',   price: 50,  icon: '🌾' },
    { name: 'Sugar',  price: 45,  icon: '🍬' },
    { name: 'Oil',    price: 120, icon: '🫙' },
    { name: 'Milk',   price: 60,  icon: '🥛' },
    { name: 'Eggs',   price: 80,  icon: '🥚' },
    { name: 'Bread',  price: 40,  icon: '🍞' },
    { name: 'Butter', price: 55,  icon: '🧈' },
    { name: 'Salt',   price: 20,  icon: '🧂' },
  ];

  billItems: BillItem[] = [];

  customerName  = '';
  mobileNumber  = '';
  customerSaved = false;
  billGenerated = false;

  readonly GST = 0.18;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  // ── Getters ───────────────────────────────────────────
  get subTotal()   { return this.billItems.reduce((s, i) => s + i.price * i.qty, 0); }
  get gstAmount()  { return parseFloat((this.subTotal * this.GST).toFixed(2)); }
  get grandTotal() { return parseFloat((this.subTotal + this.gstAmount).toFixed(2)); }
  get totalQty()   { return this.billItems.reduce((s, i) => s + i.qty, 0); }

  getQty(name: string) {
    return this.billItems.find(i => i.name === name)?.qty ?? 0;
  }

  getItem(name: string) {
    return this.billItems.find(i => i.name === name)!;
  }

  // ── Cart actions ─────────────────────────────────────
  addToCart(p: Product) {
    const found = this.billItems.find(i => i.name === p.name);
    found ? found.qty++ : this.billItems.push({ ...p, qty: 1 });
    this.toast(`${p.icon} ${p.name} added!`, 'product');
  }

  increment(item: BillItem) { item.qty++; }

  decrement(item: BillItem) {
    item.qty > 1 ? item.qty-- : this.removeItem(item);
  }

  removeItem(item: BillItem) {
    this.billItems = this.billItems.filter(i => i.name !== item.name);
  }

  // ── Customer ─────────────────────────────────────────
  saveCustomer() {
    if (!this.customerName.trim()) {
      this.toast('⚠️ Enter customer name!', 'warn'); return;
    }
    if (!/^\d{10}$/.test(this.mobileNumber)) {
      this.toast('⚠️ Enter valid 10-digit mobile!', 'warn'); return;
    }
    this.customerSaved = true;
    this.toast('👤 Customer saved!', 'customer');
    this.activeTab = 'bill';
  }

  editCustomer() {
    this.customerSaved = false;
    this.billGenerated = false;
  }

  // ── Bill ─────────────────────────────────────────────
  generateBill() {
    if (!this.customerSaved) {
      this.toast('⚠️ Save customer details first!', 'warn');
      this.activeTab = 'customer'; return;
    }
    if (this.billItems.length === 0) {
      this.toast('⚠️ Add at least one product!', 'warn');
      this.activeTab = 'products'; return;
    }
    this.billGenerated = true;
    this.toast('🧾 Bill Generated Successfully!', 'bill');
  }

  resetAll() {
    this.billItems     = [];
    this.customerName  = '';
    this.mobileNumber  = '';
    this.customerSaved = false;
    this.billGenerated = false;
    this.activeTab     = 'products';
    this.toast('🔄 Reset done!', 'product');
  }

  goBack() {
    this.router.navigate(['/member10']);
  }

  // ── Toast ─────────────────────────────────────────────
  private toast(msg: string, type: 'product' | 'customer' | 'bill' | 'warn') {
    const panel =
      type === 'warn'     ? 'toast-warn'     :
      type === 'customer' ? 'toast-customer' :
      type === 'bill'     ? 'toast-bill'     : 'toast-product';
    this.snackBar.open(msg, '✕', {
      duration: 2500,
      panelClass: [panel],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}