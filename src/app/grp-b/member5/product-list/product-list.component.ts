import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  constructor(private router: Router) {}

  selectedCategory = 'Cold Drink';

  cart: any[] = [];

  products = [

    {
      id: 1,
      name: 'Coca Cola',
      category: 'Cold Drink',
      price: 40,
      stock: true,
      image: 'assets/Omkar_products/coke.jpg'
    },
  
    {
      id: 2,
      name: 'Pepsi',
      category: 'Cold Drink',
      price: 40,
      stock: true,
      image: 'assets/Omkar_products/pepsi.jpg'
    },
  
    {
      id: 3,
      name: 'Sprite',
      category: 'Cold Drink',
      price: 40,
      stock: false,
      image: 'assets/Omkar_products/sprite.jpg'
    },
  
    {
      id: 4,
      name: 'Monster Energy',
      category: 'Energy Drink',
      price: 150,
      stock: true,
      image: 'assets/Omkar_products/monster.jpg'
    },
  
    {
      id: 5,
      name: 'Red Bull',
      category: 'Energy Drink',
      price: 125,
      stock: true,
      image: 'assets/Omkar_products/redbull.jpg'
    },
  
    {
      id: 6,
      name: 'Sting',
      category: 'Energy Drink',
      price: 25,
      stock: false,
      image: 'assets/Omkar_products/sting.jpg'
    },
  
    {
      id: 7,
      name: 'Dairy Milk',
      category: 'Chocolate',
      price: 50,
      stock: true,
      image: 'assets/Omkar_products/dairymilk.jpg'
    },
  
    {
      id: 8,
      name: 'KitKat',
      category: 'Chocolate',
      price: 20,
      stock: true,
      image: 'assets/Omkar_products/kitkat.jpg'
    },
  
    {
      id: 9,
      name: 'Snickers',
      category: 'Chocolate',
      price: 45,
      stock: false,
      image: 'assets/Omkar_products/snickers.jpg'
    },
  
    {
      id: 10,
      name: 'Protein Shake',
      category: 'Protein',
      price: 180,
      stock: true,
      image: 'assets/Omkar_products/protein.jpg'
    },
  
    {
      id: 11,
      name: 'Veg Sandwich',
      category: 'Veg',
      price: 90,
      stock: true,
      image: 'assets/Omkar_products/veg.jpg'
    },
  
    {
      id: 12,
      name: 'Chicken Burger',
      category: 'Non Veg',
      price: 150,
      stock: true,
      image: 'assets/Omkar_products/chicken.jpg'
    },
  
    {
      id: 13,
      name: 'Coke Zero',
      category: 'Zero Sugar',
      price: 55,
      stock: true,
      image: 'assets/Omkar_products/cokezero.jpg'
    },
  
    {
      id: 14,
      name: 'Pepsi Black',
      category: 'Zero Sugar',
      price: 55,
      stock: false,
      image: 'assets/Omkar_products/pepsiblack.jpg'
    }
  
  ];

  get filteredProducts() {
    return this.products.filter(
      product => product.category === this.selectedCategory
    );
  }

  filter(category: string) {
    this.selectedCategory = category;
  }

  addToCart(product:any){

    let cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
  
    cart.push(product);
  
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  
    alert(product.name + ' Added To Cart 🛒');
  
    this.router.navigate(
      ['/grp-b/member5/billing']
    );
  
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  get totalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.price,
      0
    );
  }

}