import { Component } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-grocery-billing',
  templateUrl: './grocery-billing.component.html',
  styleUrls: ['./grocery-billing.component.css']
})
export class GroceryBillingComponent {

  selectedProducts: any[] = [];
  customer: any = {};
  totalAmount = 0;

  constructor(private messageService: MessageService) {}

  addProduct(product: any) {
    const existingProduct = this.selectedProducts.find(
      item => item.name === product.name
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.subtotal = existingProduct.price * existingProduct.quantity;
    } else {
      this.selectedProducts.push({
        ...product,
        quantity: 1,
        subtotal: product.price
      });
    }

    this.calculateTotal();

    this.messageService.sendMessage(
      `Product '${product.name}' added successfully`
    );
  }

  increaseQuantity(product: any) {
    product.quantity += 1;
    product.subtotal = product.price * product.quantity;
    this.calculateTotal();

    this.messageService.sendMessage(
      `Quantity increased for '${product.name}'`
    );
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      product.subtotal = product.price * product.quantity;
    } else {
      this.removeProduct(product);
      return;
    }

    this.calculateTotal();

    this.messageService.sendMessage(
      `Quantity decreased for '${product.name}'`
    );
  }

  removeProduct(product: any) {
    this.selectedProducts = this.selectedProducts.filter(
      item => item.name !== product.name
    );

    this.calculateTotal();

    this.messageService.sendMessage(
      `Product '${product.name}' removed from bill`
    );
  }

  saveCustomer(customerData: any) {
    this.customer = customerData;

    this.messageService.sendMessage(
      `Customer '${customerData.name}' saved successfully`
    );
  }

  clearBill() {
    this.selectedProducts = [];
    this.customer = {};
    this.totalAmount = 0;

    this.messageService.sendMessage('Bill cleared successfully');
  }

  calculateTotal() {
    this.totalAmount = this.selectedProducts.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
  }

}