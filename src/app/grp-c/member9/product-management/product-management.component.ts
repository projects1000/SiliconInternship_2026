import { Component } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {

  customerName = '';
  mobileNumber = '';

  products = [
    { name: 'Rice', price: 50 },
    { name: 'Sugar', price: 45 },
    { name: 'Oil', price: 120 },
    { name: 'Milk', price: 60 },
    { name: 'Eggs', price: 80 },
    { name: 'Bread', price: 40 },
    { name: 'Butter', price: 90 },
    { name: 'Tea', price: 75 }
  ];

  selectedProducts: any[] = [];

  subtotal = 0;
  gst = 0;
  grandTotal = 0;

  notifications: string[] = [];

  addNotification(message: string) {

    this.notifications.unshift(message);

    if (this.notifications.length > 8) {
      this.notifications.pop();
    }

  }

  addProduct(product: any) {

    this.selectedProducts.push(product);

    this.calculateBill();

    this.addNotification(
      `Product '${product.name}' Added Successfully`
    );

  }

  saveCustomer() {

    if (
      this.customerName.trim() === '' ||
      this.mobileNumber.trim() === ''
    ) {

      this.addNotification(
        'Please Enter Customer Details'
      );

      return;
    }

    this.addNotification(
      `Customer '${this.customerName}' Saved Successfully`
    );

  }

  calculateBill() {

    this.subtotal = this.selectedProducts.reduce(
      (sum, item) => sum + item.price,
      0
    );

    this.gst = +(this.subtotal * 0.18).toFixed(2);

    this.grandTotal = +(
      this.subtotal + this.gst
    ).toFixed(2);

  }

  generateBill() {

    if (this.selectedProducts.length === 0) {

      this.addNotification(
        'Please Add Products First'
      );

      return;
    }

    this.calculateBill();

    this.addNotification(
      `Bill Generated Successfully. Total ₹${this.grandTotal}`
    );

  }

  clearBill() {

    this.selectedProducts = [];

    this.subtotal = 0;
    this.gst = 0;
    this.grandTotal = 0;

    this.addNotification(
      'Bill Cleared Successfully'
    );

  }

}