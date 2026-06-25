// src/app/grp-f/member4/product-management/product-management.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { CartService } from '../shared/cart.service';
import { CustomerService } from '../shared/customer.service';

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
  currentCustomer: any = null;

  constructor(
    public ps: ProductService,
    public cartService: CartService,

    private router: Router
  ) {}
ngOnInit(): void {

  this.allProducts = this.ps.products;
  this.products = this.allProducts;

  this.currentCustomer = JSON.parse(
    localStorage.getItem('currentCustomer') || 'null'
  );
}

  // ==================== SEARCH ====================
  searchProducts(): void {
    if (!this.searchText.trim()) {
      this.products = this.allProducts;
      return;
    }
    this.products = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // ==================== FILTER ====================
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

  // ==================== VIEW PRODUCT ====================
  viewProduct(id: number): void {
    this.selectedProduct = this.products.find(p => p.id === id) || null;
  }

  closeDetails(): void {
    this.selectedProduct = null;
  }

  // ==================== LOAD ====================
  loadAllProducts(): void {
    this.selectedCategory = 'All';
    this.searchText = '';
    this.products = this.allProducts;
  }

  // ==================== ADD TO CART ====================
  addToCart(product: any): void {
    this.ps.addToCart(product);
  }

  // ==================== NAVIGATION ====================
  
  // Navigation based on login status
  goToAccount(): void {
    if (this.currentCustomer) {
      this.router.navigate(['/grp-f/member4/customer']);
    } else {
      this.router.navigate(['/grp-f/member4/login']);
    }
  }

  goToMyOrders(): void {
    if (this.currentCustomer) {
      this.router.navigate(['/grp-f/member4/customer']);
    } else {
      this.router.navigate(['/grp-f/member4/login']);
    }
  }

  goToCart(): void {
    this.router.navigate(['/grp-f/member4/billing']);
  }

  goToLogin(): void {
    this.router.navigate(['/grp-f/member4/login']);
  }

  

  // ==================== BUTTON ACTIONS ====================
  onShopNow(): void {
    this.loadAllProducts();
    const productsSection = document.querySelector('app-product-list');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onExploreDeals(): void {
    this.filterCategory('Dress');
    const productsSection = document.querySelector('app-product-list');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ==================== UTILITY ====================
  getCartCount(): number {
    return this.cartService.getTotalItems();
  }

  isLoggedIn(): boolean {
    return this.currentCustomer !== null;
  }
}