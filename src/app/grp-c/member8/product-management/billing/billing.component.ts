import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  @Input() products: any[] = [];
  @Input() customer: any;

  get subtotal(): number {
    return this.products.reduce(
      (sum, product) =>
        sum + (product.price * product.qty),
      0
    );
  }

  get gst(): number {
    return this.subtotal * 0.18;
  }

  get grandTotal(): number {
    return this.subtotal + this.gst;
  }

  @Output() billGenerated = new EventEmitter<void>();

  generateBill() {
    this.billGenerated.emit();
  }
}