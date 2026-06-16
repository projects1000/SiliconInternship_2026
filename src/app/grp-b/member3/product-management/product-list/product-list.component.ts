import { Component, EventEmitter, Output } from '@angular/core';
import {
  BADGE_CLASS,
  CATEGORY_FILTERS,
  CATEGORY_ICONS,
  filterProductsByCategory,
  TECH_PRODUCTS
} from '../constants/billing.constants';
import { CategoryFilter, Product } from '../models/billing.models';
import { SharedTusharService } from '../services/shared-tushar.service';

@Component({
  selector: 'app-pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Output() productAdded = new EventEmitter<Product>();

  readonly categories = CATEGORY_FILTERS;
  readonly categoryIcons = CATEGORY_ICONS;
  readonly badgeClass = BADGE_CLASS;
  readonly allProducts = TECH_PRODUCTS;

  selectedCategory: CategoryFilter = 'All';

  constructor(private sharedService: SharedTusharService) {}

  get filteredProducts(): Product[] {
    return filterProductsByCategory(this.allProducts, this.selectedCategory);
  }

  selectCategory(category: CategoryFilter): void {
    this.selectedCategory = category;
  }

  addProduct(product: Product): void {
    this.productAdded.emit(product);
    this.sharedService.notify(`${product.name} added to bill`, 'product');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    img.parentElement?.classList.add('product-card__media--fallback');
  }
}
