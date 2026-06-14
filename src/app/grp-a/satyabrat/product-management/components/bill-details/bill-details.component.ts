import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
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
export class BillDetailsComponent implements OnInit, OnDestroy {
  @Input() selectedItems$!: Observable<BillItem[]>;
  @Input() customerName$!: Observable<string>;
  @Input() mobileNumber$!: Observable<string>;
  @Input() isReturningCustomer$!: Observable<boolean>;

  selectedItems: BillItem[] = [];
  customerName: string = '';
  mobileNumber: string = '';
  isReturningCustomer: boolean = false;

  private subscription = new Subscription();
  
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
  @Output() itemIncreased = new EventEmitter<number>();
  @Output() itemDecreased = new EventEmitter<number>();

  subTotal: number = 0;
  discountAmount: number = 0;
  gstAmount: number = 0;
  grandTotal: number = 0;

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.subscription.add(
      combineLatest([
        this.selectedItems$,
        this.customerName$,
        this.mobileNumber$,
        this.isReturningCustomer$
      ]).subscribe(([items, name, mobile, isReturning]) => {
        this.selectedItems = items;
        this.customerName = name;
        this.mobileNumber = mobile;
        this.isReturningCustomer = isReturning;
        this.calculateTotals();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  increaseQuantity(index: number) {
    this.itemIncreased.emit(index);
  }

  decreaseQuantity(index: number) {
    this.itemDecreased.emit(index);
  }

  private calculateTotals() {
    this.subTotal = this.selectedItems.reduce((sum, item) => sum + item.total, 0);
    this.discountAmount = 0; // Discount not given financially, only notification generated
    const taxableAmount = this.subTotal - this.discountAmount;
    this.gstAmount = taxableAmount * 0.18;
    this.grandTotal = taxableAmount + this.gstAmount;
  }
}
