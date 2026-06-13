import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';

interface Product {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-product-list1',
  templateUrl: './product-list1.component.html',
  styleUrls: ['./product-list1.component.css']
})
export class ProductList1Component {

  searchText: string = '';

  products: Product[] = [
    { id: 1, name: 'Pen', price: 10, qty: 1 },
    { id: 2, name: 'Pencil', price: 5, qty: 1 },
    { id: 3, name: 'Notebook', price: 40, qty: 1 },
    { id: 4, name: 'Marker', price: 25, qty: 1 }
  ];

  constructor(private messageService: MessageService) {}

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addProduct(product: Product) {
    product.qty += 1;
    this.messageService.showToast('success', 'Quantity added successfully');
  }

  removeProduct(product: Product) {
    if (product.qty > 1) {
      product.qty -= 1;
      this.messageService.showToast('info', 'Quantity decreased successfully');
    } else {
      this.products = this.products.filter(p => p.id !== product.id);
      this.messageService.showToast('warning', 'Product removed successfully');
    }
  }

  resetAll() {
    this.products.forEach(p => p.qty = 1);
    this.messageService.showToast('info', 'Cart reset successfully');
  }

  // BILL GENERATION
  generateBill() {

    const customer = this.messageService.getCustomer();

    const total = this.products.reduce(
      (sum, p) => sum + (p.price * p.qty),
      0
    );

    this.messageService.setBill({
      customerName: customer?.customerName || 'Not Selected',
      email: customer?.email || '',
      phone: customer?.phone || '',
      total: total
    });

    this.messageService.showToast(
      'success',
      `Bill generated successfully of ₹${total}`
    );
  }
}