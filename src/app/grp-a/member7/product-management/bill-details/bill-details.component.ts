import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../notification.service';

export interface BillItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnChanges {

  @Input() billItems: BillItem[] = [];
  @Input() customerName: string = '';
  @Input() customerMobile: string = '';
  @Input() subtotal: number = 0;
  @Input() gst: number = 0;
  @Input() grandTotal: number = 0;

  @Output() billGenerated = new EventEmitter<void>();

  isGenerated: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Reset generated state when bill items change
    if (changes['billItems']) {
      this.isGenerated = false;
    }
  }

  generateBill(): void {
    if (this.billItems.length === 0) {
      this.notificationService.sendWarning('Please add at least one product to generate a bill.');
      return;
    }
    if (!this.customerName) {
      this.notificationService.sendWarning('Please save customer details before generating the bill.');
      return;
    }

    this.isGenerated = true;
    this.billGenerated.emit();
    this.notificationService.sendBillGenerated(`₹${this.grandTotal.toFixed(2)}`);
  }

  clearBill(): void {
    this.isGenerated = false;
  }
}
