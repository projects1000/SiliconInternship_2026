import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

export interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Output() productAdded = new EventEmitter<Product>();

  products: Product[] = [
    { name: 'Rice',  price: 50  },
    { name: 'Sugar', price: 45  },
    { name: 'Oil',   price: 120 },
    { name: 'Milk',  price: 60  },
    { name: 'Eggs',  price: 80  }
  ];

  // Track which product was just added (for button ripple effect)
  addedProductName: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  addProduct(product: Product): void {
    this.productAdded.emit(product);
    this.notificationService.sendProductAdded(product.name);

    // Flash the button
    this.addedProductName = product.name;
    setTimeout(() => {
      this.addedProductName = null;
    }, 600);
  }
}
