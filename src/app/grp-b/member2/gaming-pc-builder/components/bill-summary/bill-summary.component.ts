// ============================================================
// bill-summary.component.ts
// Child component — displays bill summary
// Demonstrates: Parent → Child Communication via @Input
// Data flows FROM parent TO this child component
// ============================================================

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../shared_Rohan_24bcsg13/product.model';
import { Customer } from '../../shared_Rohan_24bcsg13/customer.model';

@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.css']
})
export class BillSummaryComponent implements OnChanges {

  // ✅ @Input — Receives selected products FROM parent (Parent → Child Communication)
  @Input() selectedProducts: Product[] = [];

  // ✅ @Input — Receives customer data FROM parent
  @Input() customer: Customer | null = null;

  // ✅ @Input — Receives calculated totals FROM parent
  @Input() subtotal: number = 0;
  @Input() gstAmount: number = 0;
  @Input() grandTotal: number = 0;
  @Input() gstPercent: number = 18;

  // ✅ @Input — Receives bill generated flag FROM parent
  @Input() billGenerated: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Reacts automatically when parent sends new data
    // This is the essence of @Input — reactive to parent state
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }
}
