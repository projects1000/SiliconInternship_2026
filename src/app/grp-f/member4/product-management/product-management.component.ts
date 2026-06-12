import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products: any[] = [];
  allProducts: any[] = [];

  selectedProduct: any = null;

  searchText: string = '';
  selectedCategory: string = 'All';

  constructor(public ps: ProductService) {}

  ngOnInit(): void {
    this.allProducts = this.ps.products;
    this.products = this.allProducts;
  }

  searchProducts(): void {
    this.products = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  filterCategory(category: string): void {

    this.selectedCategory = category;

    if (category === 'All') {
      this.products = this.allProducts;
      return;
    }

    this.products = this.allProducts.filter(p =>
      (p.category || '').trim().toLowerCase() === category.trim().toLowerCase()
    );
  }

  viewProduct(id: number): void {
    this.selectedProduct =
      this.products.find(p => p.id === id) || null;
  }

  closeDetails(): void {
    this.selectedProduct = null;
  }

  loadAllProducts(): void {
    this.selectedCategory = 'All';
    this.products = this.allProducts;
  }

  addToCart(product: any): void {
    this.ps.addToCart(product);
  }
}
