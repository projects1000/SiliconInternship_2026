import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Output() productAdded = new EventEmitter<any>();

  products = [
  { name: 'Rice', price: 50, quantity: 1 },
  { name: 'Sugar', price: 45, quantity: 1 },
  { name: 'Oil', price: 120, quantity: 1 },
  { name: 'Milk', price: 60, quantity: 1 }
];

  constructor(private sharedService: SharedService) {}

  addProduct(product: any) {

  const selectedProduct = {
    ...product,
    total: product.price * product.quantity
  };

  this.productAdded.emit(selectedProduct);

  this.sharedService.sendMessage(
    `${product.quantity} ${product.name}(s) Added Successfully`
  );
  }
}
