import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-management/product.service';
import { Plant } from '../product-management/product.model';

@Component({
  selector: 'app-product-lis',
  templateUrl: './product-lis.component.html'
})
export class ProductLisComponent implements OnInit {
  products: Plant[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Ensure this matches the method name defined in your product.service.ts
    this.products = this.productService.getItems(); 
  }
}