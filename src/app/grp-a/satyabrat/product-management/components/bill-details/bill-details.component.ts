import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { BillingService } from '../../services/billing.service';

export interface BillItem {
  name: string;
  qty: number;
  price: number;
  total: number;
  image: string;
}

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnChanges {
  @Input() selectedItems: BillItem[] = [];
  @Input() customerName: string = '';
  @Input() mobileNumber: string = '';
  @Input() isReturningCustomer: boolean = false;
  
  @Output() billGenerated = new EventEmitter<{
    customerName: string;
    mobileNumber: string;
    items: BillItem[];
    subTotal: number;
    discountAmount: number;
    gstAmount: number;
    grandTotal: number;
  }>();

  @Output() itemRemoved = new EventEmitter<number>();

  subTotal: number = 0;
  discountAmount: number = 0;
  gstAmount: number = 0;
  grandTotal: number = 0;

  constructor(private billingService: BillingService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.calculateTotals();
  }

  generateBill() {
    if (this.selectedItems.length === 0) {
      this.billingService.sendNotification('Please add at least one item to generate a bill!', 'bill');
      return;
    }

    if (!this.customerName || !this.customerName.trim() || !this.mobileNumber || !this.mobileNumber.trim()) {
      this.billingService.sendNotification('Please register and save customer details first!', 'customer');
      return;
    }
    
    this.billGenerated.emit({
      customerName: this.customerName,
      mobileNumber: this.mobileNumber,
      items: [...this.selectedItems],
      subTotal: this.subTotal,
      discountAmount: this.discountAmount,
      gstAmount: this.gstAmount,
      grandTotal: this.grandTotal
    });

    const msg = this.isReturningCustomer
      ? `Bill generated with 10% loyalty discount for ${this.customerName}`
      : `Bill generated successfully for ${this.customerName}`;
    this.billingService.sendNotification(msg, 'bill');
  }

  removeItem(index: number) {
    this.itemRemoved.emit(index);
  }

  private calculateTotals() {
    this.subTotal = this.selectedItems.reduce((sum, item) => sum + item.total, 0);
    this.discountAmount = this.isReturningCustomer ? this.subTotal * 0.10 : 0;
    const taxableAmount = this.subTotal - this.discountAmount;
    this.gstAmount = taxableAmount * 0.18;
    this.grandTotal = taxableAmount + this.gstAmount;
  }
}
