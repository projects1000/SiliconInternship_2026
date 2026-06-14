// ============================================================
// billing.service.ts
// Handles bill calculation logic
// Used by GamingPcBuilderComponent (parent)
// ============================================================

import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Customer } from './customer.model';
import { GST_RATE } from './constants';

export interface BillBreakdown {
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  gstPercent: number;
}

export interface SavedBill {
  id: string;
  date: string;
  customer: Customer;
  products: Product[];
  breakdown: BillBreakdown;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private readonly STORAGE_KEY = 'gaming_pc_bills';

  calculateBill(products: Product[]): BillBreakdown {
    const subtotal = products.reduce((sum, p) => sum + p.price, 0);
    const gstAmount = parseFloat((subtotal * GST_RATE).toFixed(2));
    const grandTotal = parseFloat((subtotal + gstAmount).toFixed(2));
    return {
      subtotal,
      gstAmount,
      grandTotal,
      gstPercent: GST_RATE * 100
    };
  }

  saveBill(customer: Customer, products: Product[], breakdown: BillBreakdown): void {
    const newBill: SavedBill = {
      id: 'BILL-' + Date.now().toString(),
      date: new Date().toISOString(),
      customer,
      products,
      breakdown
    };

    const savedBills = this.getSavedBills();
    savedBills.unshift(newBill); // Add to top
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedBills));
  }

  getSavedBills(): SavedBill[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Error parsing saved bills', e);
        return [];
      }
    }
    return [];
  }
}
