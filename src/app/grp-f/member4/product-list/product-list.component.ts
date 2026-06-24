import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Productservice } from '../shared/product.service';
import { CartService } from '../shared/cart.service';
import { ToastService } from '../shared/toast.service';

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
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.ps.products;
    this.filteredProducts = [...this.products];
  }

  filterByPrice(): void {
    this.filteredProducts = this.products.filter(p =>
      p.price >= this.priceRange.min && p.price <= this.priceRange.max
    );
  }

  onSortChange(): void {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        this.filteredProducts = [...this.products];
    }
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = this.products.filter(p => p.category === category);
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  clearFilters(): void {
    this.priceRange = { min: 0, max: 100000 };
    this.sortBy = 'featured';
    this.selectedCategory = '';
    this.searchQuery = '';
    this.filteredProducts = [...this.products];
  }

  viewProductDetails(product: Productservice): void {
    this.router.navigate(['/grp-f/member4/product-detail', product.id]);
  }

  /** ADD TO CART - Fixed & Direct Navigation to Cart */
  addToCart(product: Productservice, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    // Add product to cart
    this.cartService.addToCart(product, 1);

    // Show success message
    this.toastService.show(`${product.name} added to cart`, 'success');

    // Navigate to Cart Page
    this.router.navigate(['/grp-f/member4/cart']);
  }

  /** Wishlist */
  addToWishlist(product: Productservice, event?: Event): void {
    if (event) event.stopPropagation();
    this.toastService.show(`${product.name} added to Wishlist ❤️`, 'success');
  }

  getDiscountPercentage(product: Productservice): number {
    if (!product.originalPrice) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  }
}