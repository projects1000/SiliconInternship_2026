// ============================================================
// category-filter.component.ts
// Child component — emits selected category to parent
// Demonstrates: Child → Parent Communication via @Output EventEmitter
// ============================================================

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CATEGORIES } from '../../shared_Rohan_24bcsg13/constants';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {

  // ✅ @Input — Receives currently selected category from parent
  @Input() selectedCategory: string = 'All';

  // ✅ @Output — Emits category selection event to parent
  @Output() categoryChanged = new EventEmitter<string>();

  categories: string[] = [];

  ngOnInit(): void {
    this.categories = CATEGORIES;
  }

  // Called when user clicks a category button
  selectCategory(cat: string): void {
    // ✅ Child → Parent: emitting event
    this.categoryChanged.emit(cat);
  }
}
