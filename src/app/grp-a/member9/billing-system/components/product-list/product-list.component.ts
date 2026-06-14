import { Component, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  // 1. @Output acts as a custom event that the Parent can listen to
  @Output() productAdded = new EventEmitter<Product>();

  // Hardcoded list of products as per your requirement
  products: Product[] = [
    { name: 'Rice', price: 50 },
    { name: 'Sugar', price: 45 },
    { name: 'Oil', price: 120 },
    { name: 'Milk', price: 60 },
    { name: 'Eggs', price: 80 }
  ];

  // 2. Inject the shared service in the constructor
  constructor(private notificationService: NotificationService) {}

  // 3. This function runs when the "Add" button is clicked
  onAdd(product: Product) {
    this.productAdded.emit(product); // Send selected product UP to parent
    
    // Send success message to the shared service
    this.notificationService.sendMessage({ 
      type: 'success', 
      message: `Product '${product.name}' Added Successfully` 
    });
  }
}