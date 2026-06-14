import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillingService } from '../../services/billing.service';

export interface Product {
  name: string;
  price: number;
  image: string;
  rating: number;
  imgError?: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Output() productAdded = new EventEmitter<Product>();

  searchText: string = '';
  activeDiscounts: { [key: string]: number } = {};
  private discountSub!: Subscription;

  products: Product[] = [
    { name: 'Rice', price: 50, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop', rating: 4.5 },
    { name: 'Sugar', price: 45, image: 'https://images.unsplash.com/photo-1709651808265-977ed7ef78c6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.2 },
    { name: 'Oil', price: 120, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=718&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.7 },
    { name: 'Milk', price: 60, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop', rating: 4.8 },
    { name: 'Eggs', price: 80, image: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.6 },
    { name: 'Apple', price: 150, image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&auto=format&fit=crop', rating: 4.8 },
    { name: 'Bread', price: 35, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop', rating: 4.3 },
    { name: 'Butter', price: 55, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop', rating: 4.5 },
    { name: 'Cheese', price: 90, image: 'https://images.unsplash.com/photo-1683314573422-649a3c6ad784?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.6 },
    { name: 'Coffee', price: 220, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.9 },
    { name: 'Tea', price: 110, image: 'https://images.unsplash.com/photo-1527398317618-b3da8a79e0ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhJTIwcGFja2FnaW5nfGVufDB8fDB8fHww', rating: 4.7 },
    { name: 'Salt', price: 20, image: 'https://images.unsplash.com/photo-1614759258004-39da973d3268?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FsdCUyMHBhY2tldHxlbnwwfHwwfHx8MA%3D%3D', rating: 4.1 },
    { name: 'Wheat Flour', price: 40, image: 'https://images.unsplash.com/photo-1627735483792-233bf632619b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hlYXQlMjBmbG91cnxlbnwwfHwwfHx8MA%3D%3D', rating: 4.4 },
    { name: 'Potato', price: 30, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop', rating: 4.3 },
    { name: 'Tomato', price: 40, image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRvfGVufDB8fDB8fHww', rating: 4.2 },
    { name: 'Onion', price: 25, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop', rating: 4.1 },
    { name: 'Pasta', price: 65, image: 'https://images.unsplash.com/photo-1497802492746-aa584aa6ea22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdGElMjBwYWNrZXR8ZW58MHx8MHx8fDA%3D', rating: 4.5 },
    { name: 'Oats', price: 85, image: 'https://plus.unsplash.com/premium_photo-1671130295244-b058fc8d86fe?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.6 },
    { name: 'Honey', price: 150, image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8fDA%3D', rating: 4.8 },
    { name: 'Yogurt', price: 45, image: 'https://images.unsplash.com/photo-1641196936589-7df4db18de66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvZ3VydHxlbnwwfHwwfHx8MA%3D%3D', rating: 4.4 },
    { name: 'Lentils', price: 95, image: 'https://images.unsplash.com/photo-1552585960-0e1069ce7405?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D', rating: 4.7 }
  ];

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    // Subscribe to discount changes from admin
    this.discountSub = this.billingService.productDiscounts$.subscribe(discounts => {
      this.activeDiscounts = discounts;
    });
  }

  ngOnDestroy() {
    if (this.discountSub) {
      this.discountSub.unsubscribe();
    }
  }

  addProduct(product: Product) {
    const discountedPrice = this.getDiscountedPrice(product);
    const productToEmit = { ...product, price: discountedPrice };
    this.productAdded.emit(productToEmit);
  }

  getDiscount(productName: string): number {
    return this.activeDiscounts[productName] || 0;
  }

  getDiscountedPrice(product: Product): number {
    const disc = this.getDiscount(product.name);
    if (disc > 0) {
      return product.price - (product.price * disc / 100);
    }
    return product.price;
  }

  getProductIcon(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('rice')) return 'eco';
    if (n.includes('sugar')) return 'cookie';
    if (n.includes('oil')) return 'opacity';
    if (n.includes('milk')) return 'water_drop';
    if (n.includes('egg')) return 'egg';
    if (n.includes('apple')) return 'nutrition';
    if (n.includes('bread')) return 'bakery_dining';
    if (n.includes('butter')) return 'layers';
    if (n.includes('cheese')) return 'takeout_dining';
    if (n.includes('coffee')) return 'local_cafe';
    if (n.includes('tea')) return 'emoji_food_beverage';
    if (n.includes('salt')) return 'grain';
    if (n.includes('flour')) return 'cookie';
    if (n.includes('potato')) return 'lens';
    if (n.includes('tomato')) return 'radio_button_checked';
    return 'restaurant';
  }

  get filteredProducts(): Product[] {
    if (!this.searchText.trim()) {
      return this.products;
    }
    const query = this.searchText.toLowerCase();
    return this.products.filter(p => p.name.toLowerCase().includes(query));
  }
}
