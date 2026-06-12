import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillLineItem, BillSummary, CustomerInfo } from '../models/billing.models';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {
  @Input() billItems: BillLineItem[] = [];
  @Input() customer: CustomerInfo | null = null;
  @Input() billSummary: BillSummary = { subtotal: 0, gst: 0, grandTotal: 0 };
  @Input() showGst = true;

  @Output() quantityChanged = new EventEmitter<{ productId: number; quantity: number }>();
  @Output() itemRemoved = new EventEmitter<number>();

  getLineTotal(item: BillLineItem): number {
    return item.product.price * item.quantity;
  }

  increaseQuantity(item: BillLineItem): void {
    this.quantityChanged.emit({
      productId: item.product.id,
      quantity: item.quantity + 1
    });
  }

  decreaseQuantity(item: BillLineItem): void {
    this.quantityChanged.emit({
      productId: item.product.id,
      quantity: item.quantity - 1
    });
  }

  removeItem(productId: number): void {
    this.itemRemoved.emit(productId);
  }
}
