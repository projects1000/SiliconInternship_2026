import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillingProduct } from '../billing.models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() customerSaved = false;
  @Output() productAdded = new EventEmitter<BillingProduct>();

  products: BillingProduct[] = [
    { id: 1, name: 'Rice', price: 50 },
    { id: 2, name: 'Sugar', price: 45 },
    { id: 3, name: 'Oil', price: 120 },
    { id: 4, name: 'Milk', price: 60 },
    { id: 5, name: 'Eggs', price: 80 },
    { id: 6, name: 'Bread', price: 40 }
  ];

  addProduct(product: BillingProduct): void {
    this.productAdded.emit(product);
  }
}

