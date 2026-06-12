import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Productservice } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Productservice[] = [];
  filteredProducts: Productservice[] = [];

  searchQuery: string = '';
  selectedCategory: string = '';
  sortBy: string = 'featured';

  priceRange = {
    min: 0,
    max: 100000
  };

  constructor(
    public ps: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.ps.products;
    this.filteredProducts = [...this.products];
  }

  /* ---------------- FILTER BY PRICE ---------------- */
  filterByPrice(): void {
    this.filteredProducts = this.products.filter(p =>
      p.price >= this.priceRange.min &&
      p.price <= this.priceRange.max
    );
  }

  /* ---------------- SORT ---------------- */
  onSortChange(): void {

    switch (this.sortBy) {

      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;

      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;

      case 'rating':
       this.filteredProducts.sort((a, b) =>
  (b.rating ?? 0) - (a.rating ?? 0)
);
break;

      default:
        this.filteredProducts = [...this.products];
    }
  }

  /* ---------------- CATEGORY FILTER ---------------- */
  filterCategory(category: string): void {
    this.selectedCategory = category;

    this.filteredProducts = this.products.filter(p =>
      p.category === category
    );
  }

  /* ---------------- SEARCH ---------------- */
  searchProducts(): void {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  /* ---------------- CLEAR FILTER ---------------- */
  clearFilters(): void {
    this.priceRange = { min: 0, max: 100000 };
    this.sortBy = 'featured';
    this.selectedCategory = '';
    this.searchQuery = '';
    this.filteredProducts = [...this.products];
  }

  /* ---------------- VIEW PRODUCT ---------------- */
viewProductDetails(product: Productservice) {
  this.router.navigate(['/grp-f/member4/product-detail', product.id]);
}
  /* ---------------- ADD TO CART ---------------- */
  addToCart(product: Productservice): void {
  this.router.navigate(['/grp-f/member4/cart', product.id]);
  }

  /* ---------------- DISCOUNT ---------------- */
  getDiscountPercentage(product: Productservice): number {
    if (!product.originalPrice) return 0;

    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  }
}