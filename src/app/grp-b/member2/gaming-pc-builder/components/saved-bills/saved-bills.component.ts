import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BillingService, SavedBill } from '../../shared_Rohan_24bcsg13/billing.service';

@Component({
  selector: 'app-saved-bills',
  templateUrl: './saved-bills.component.html',
  styleUrls: ['./saved-bills.component.css']
})
export class SavedBillsComponent implements OnInit {

  @Output() closeView = new EventEmitter<void>();

  savedBills: SavedBill[] = [];

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.savedBills = this.billingService.getSavedBills();
  }

  onClose(): void {
    this.closeView.emit();
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}
