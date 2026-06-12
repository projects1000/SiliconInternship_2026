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

  addProduct(product: any) {

    this.selectedProducts.push(product);

    this.calculateBill();

    this.notifications.unshift(
      `${product.name} Added Successfully`
    );
  }

  saveCustomer() {

    if (
      this.customerName.trim() === '' ||
      this.mobileNumber.trim() === ''
    ) {
      this.notifications.unshift(
        'Please Enter Customer Details'
      );

      return;
    }

    this.notifications.unshift(
      'Customer Saved Successfully'
    );
  }

  calculateBill() {

    this.subtotal = this.selectedProducts.reduce(
      (sum, item) => sum + item.price,
      0
    );

    this.gst = +(this.subtotal * 0.18).toFixed(2);

    this.grandTotal =
      +(this.subtotal + this.gst).toFixed(2);
  }

  clearBill() {

    this.selectedProducts = [];

    this.subtotal = 0;
    this.gst = 0;
    this.grandTotal = 0;

    this.notifications.unshift(
      'Bill Cleared Successfully'
    );
  }
}