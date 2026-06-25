import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Output()
  productAdded = new EventEmitter<any>();

  searchText = '';

  selectedCategory = 'Vegetables';

  categories = [
    { label: '🥦 Vegetables', value: 'Vegetables' },
    { label: '🍎 Fruits', value: 'Fruits' },
    { label: '🥛 Dairy', value: 'Dairy' },
    { label: '🍞 Bakery', value: 'Bakery' },
    { label: '🍪 Snacks', value: 'Snacks' },
    { label: '🧃 Beverages', value: 'Beverages' }
  ];

  allProducts: any = {
    Vegetables: [
      { name: 'Tomato', price: 40, image: 'assets/images/grocery/tomato.png' },
      { name: 'Potato', price: 30, image: 'assets/images/grocery/potato.png' },
      { name: 'Onion', price: 35, image: 'assets/images/grocery/onion.png' },
      { name: 'Carrot', price: 50, image: 'assets/images/grocery/carrot.png' },
      { name: 'Capsicum', price: 60, image: 'assets/images/grocery/capsicum.jpg' }
    ],

    Fruits: [
      { name: 'Apple', price: 120, image: 'assets/images/grocery/apple.png' },
      { name: 'Banana', price: 50, image: 'assets/images/grocery/banana.png' },
      { name: 'Orange', price: 90, image: 'assets/images/grocery/orange.png' },
      { name: 'Mango', price: 150, image: 'assets/images/grocery/mango.png' },
      { name: 'Grapes', price: 100, image: 'assets/images/grocery/grapes.png' }
    ],

    Dairy: [
      { name: 'Milk', price: 60, image: 'assets/images/grocery/milk.png' },
      { name: 'Curd', price: 40, image: 'assets/images/grocery/curd.png' },
      { name: 'Paneer', price: 90, image: 'assets/images/grocery/paneer.png' },
      { name: 'Butter', price: 55, image: 'assets/images/grocery/butter.png' },
      { name: 'Cheese', price: 110, image: 'assets/images/grocery/cheese.png' }
    ],

    Bakery: [
      { name: 'Bread', price: 45, image: 'assets/images/grocery/bread.png' },
      { name: 'Cake', price: 250, image: 'assets/images/grocery/cake.png' },
      { name: 'Bun', price: 30, image: 'assets/images/grocery/bun.jpg' },
      { name: 'Cookies', price: 80, image: 'assets/images/grocery/cookies.png' },
      { name: 'Muffin', price: 70, image: 'assets/images/grocery/muffin.png' }
    ],

    Snacks: [
      { name: 'Chips', price: 20, image: 'assets/images/grocery/chips.png' },
      { name: 'Biscuits', price: 25, image: 'assets/images/grocery/biscuits.jpg' },
      { name: 'Noodles', price: 40, image: 'assets/images/grocery/noodles.jpg' },
      { name: 'Popcorn', price: 40, image: 'assets/images/grocery/popcorn.png' },
      { name: 'Chocolate', price: 50, image: 'assets/images/grocery/chocolate.jpg' }
    ],

    Beverages: [
      { name: 'Juice', price: 40, image: 'assets/images/grocery/juice.png' },
      { name: 'Cold Drink', price: 45, image: 'assets/images/grocery/colddrink.png' },
      { name: 'Coffee', price: 120, image: 'assets/images/grocery/coffee.png' },
      { name: 'Tea', price: 80, image: 'assets/images/grocery/tea.png' },
      { name: 'Energy Drink', price: 110, image: 'assets/images/grocery/energydrink.png' }
    ]
  };

  get products() {
    const categoryProducts = this.allProducts[this.selectedCategory] || [];

    if (!this.searchText.trim()) {
      return categoryProducts;
    }

    return categoryProducts.filter((product: any) =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.searchText = '';
  }

  addProduct(product: any) {
    this.productAdded.emit(product);
  }
}