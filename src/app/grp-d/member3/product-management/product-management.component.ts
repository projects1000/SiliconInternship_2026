import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Plant } from './product.model';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  // Array to hold the plants displayed on the UI
  products: Plant[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetches the list of plants from the service on load
    this.products = this.productService.getItems();
  }

  // Triggered by the "Add to Build" button in your HTML
  addToCart(plant: Plant): void {
    this.productService.addToCart(plant);
  }
}