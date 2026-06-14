import { Component } from '@angular/core';
import { ShopStateService } from '../shop-state.service';

@Component({
  selector: 'app-m6-shop-product-feed',
  templateUrl: './m6-shop-product-feed.component.html',
  styleUrls: ['./m6-shop-product-feed.component.css'] // THIS LINE IS CRITICAL
})
export class M6ShopProductFeedComponent {
  products = [
    { id: 1, name: 'Rice', price: 50 },
    { id: 2, name: 'Sugar', price: 45 },
    { id: 3, name: 'Oil', price: 120 },
    { id: 4, name: 'Milk', price: 60 }
  ];

  constructor(private shop: ShopStateService) {}

  add(p: any) {
    this.shop.addProduct(p);
  }
}
