import { Component, EventEmitter, Output } from '@angular/core';
import { BillingNotificationService } from '../billing-notification.service';

export interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
}

@Component({
  selector: 'app-m7-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [
    { name: 'Nitro Original', price: 50, description: 'Classic nitrogen-infused signature soda.', category: 'Classic' },
    { name: 'Nitro Lime Boost', price: 45, description: 'Zesty lemon-lime rush with electrolyte charge.', category: 'Citrus' },
    { name: 'Nitro Midnight Berry', price: 120, description: 'Premium blackberry and dark grape infusion.', category: 'Premium' },
    { name: 'Nitro Tropical Mango', price: 60, description: 'Juicy exotic mango fusion.', category: 'Tropical' },
    { name: 'Nitro Energy Black', price: 80, description: 'High-octane double caffeine kick.', category: 'Energy' }
  ];

  @Output() productAdded = new EventEmitter<Product>();

  constructor(private notificationService: BillingNotificationService) {}

  addProduct(product: Product): void {
    // Emit to parent
    this.productAdded.emit(product);
    
    // Notify via shared service
    this.notificationService.sendMessage(`Product Added: ${product.name}`, 'success');
  }
}
