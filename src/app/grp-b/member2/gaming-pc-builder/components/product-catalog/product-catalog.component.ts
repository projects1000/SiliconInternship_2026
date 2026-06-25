// ============================================================
// product-catalog.component.ts
// Child component — displays product cards, handles search & filtering
// Demonstrates: Child → Parent Communication via @Output EventEmitter
//               Parent → Child Communication via @Input
// ============================================================

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../shared_Rohan_24bcsg13/product.model';
import { PRODUCTS } from '../../shared_Rohan_24bcsg13/constants';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit, OnChanges {

  // ✅ @Input — Receives selected category from parent (passed from category filter)
  @Input() selectedCategory: string = 'All';

  // ✅ @Input — Receives list of already-added product IDs from parent
  @Input() selectedProductIds: number[] = [];

  // ✅ @Output — Emits selected product to parent when "Add To Build" clicked
  @Output() productSelected = new EventEmitter<Product>();

  // ✅ @Output — Emits product to remove from parent build
  @Output() productRemoved = new EventEmitter<Product>();

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.allProducts = PRODUCTS;
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-filter whenever parent changes selectedCategory
    if (changes['selectedCategory']) {
      this.applyFilters();
    }
  }

  applyFilters(): void {
    let result = this.allProducts;

    // Filter by category
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    this.filteredProducts = result;
  }

  onSearch(): void {
    this.applyFilters();
  }

  isSelected(product: Product): boolean {
    return this.selectedProductIds.includes(product.id);
  }

  onAddProduct(product: Product): void {
    if (!this.isSelected(product)) {
      // ✅ Child → Parent: emit selected product up to parent
      this.productSelected.emit(product);
    }
  }

  onRemoveProduct(product: Product): void {
    // ✅ Child → Parent: emit product to remove up to parent
    this.productRemoved.emit(product);
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }
}
