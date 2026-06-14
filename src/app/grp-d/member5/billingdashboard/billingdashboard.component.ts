import { Component } from '@angular/core';

@Component({
  selector: 'app-billingdashboard',
  templateUrl: './billingdashboard.component.html',
  styleUrls: ['./billingdashboard.component.css']
})
export class BillingdashboardComponent {

  products = [

    {
      id: 1,
      name: 'Mandala Art',
      price: 499,
      image: 'assets/mandala.jpg'
    },

    {
      id: 2,
      name: 'Resin Bookmark',
      price: 299,
      image: 'assets/resin.jpg'
    },

    {
      id: 3,
      name: 'Handmade Vase',
      price: 699,
      image: 'assets/vessel.jpg'
    },

    {
      id: 4,
      name: 'Canvas Painting',
      price: 899,
      image: 'assets/canvas.jpg'
    }

  ];

  cart: any[] = [];

  totalAmount = 0;

  billGenerated = false;

  addToCart(product: any) {

    const existingProduct = this.cart.find(
      item => item.id === product.id
    );

    if (existingProduct) {

      existingProduct.quantity++;

    } else {

      this.cart.push({
        ...product,
        quantity: 1
      });

    }

    this.calculateTotal();
  }

  removeItem(item: any) {

    this.cart = this.cart.filter(
      product => product.id !== item.id
    );

    this.calculateTotal();
  }

  increaseQuantity(item: any) {

    item.quantity++;

    this.calculateTotal();
  }

  decreaseQuantity(item: any) {

    if(item.quantity > 1){

      item.quantity--;

    }else{

      this.removeItem(item);

    }

    this.calculateTotal();
  }

  calculateTotal() {

    this.totalAmount = 0;

    this.cart.forEach(item => {

      this.totalAmount +=
      item.price * item.quantity;

    });

  }

  generateBill() {

    this.billGenerated = true;

  }

}