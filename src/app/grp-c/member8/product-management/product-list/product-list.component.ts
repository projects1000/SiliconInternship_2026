import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Output() productAdded = new EventEmitter<any>();

products = [

  {
  name: 'Rice',
  price: 50,
  qty: 0,
  image: 'assets/products/safaq_rice.jpg'
},

  {
    name: 'Milk',
    price: 60,
    qty: 0,
    image: 'assets/products/safaq_milk.jpg'
  },

  {
    name: 'Sugar',
    price: 45,
    qty: 0,
    image: 'assets/products/safaq_sugar.jpg'
  },

  {
    name: 'Oil',
    price: 120,
    qty: 0,
    image: 'assets/products/safaq_oil.jpg'
  },

  {
    name: 'Bread',
    price: 40,
    qty: 0,
    image: 'assets/products/safaq_bread.jpg'
  },

  {
    name: 'Eggs',
    price: 70,
    qty: 0,
    image: 'assets/products/safaq_egg.jpg'
  },

  {
    name: 'Tea',
    price: 90,
    qty: 0,
    image: 'assets/products/safaq_tea.jpg'
  },

  {
    name: 'Coffee',
    price: 150,
    qty: 0,
    image: 'assets/products/safaq_coffee.jpg'
  },

  {
    name: 'Shampoo',
    price: 110,
    qty: 0,
    image: 'assets/products/safaq_shampoo.jpg'
  },

  {
    name: 'Chocolate',
    price: 60,
    qty: 0,
    image: 'assets/products/safaq_chocolate.jpg'
  },

  {
    name: 'Toothpaste',
    price: 55,
    qty: 0,
    image: 'assets/products/safaq_toothpaste.jpg'
  }

];

  increase(product: any) {

    product.qty++;

    this.productAdded.emit({
      ...product,
      action: 'added'
    });
  }

  decrease(product: any) {

    if (product.qty > 0) {

      product.qty--;

      this.productAdded.emit({
        ...product,
        action: 'removed'
      });
    }
  }
}