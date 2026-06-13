import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BillingProduct, BillingTotals } from '../billing.models';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() customerSaved: boolean = false;

  @Output() productAdded = new EventEmitter<BillingProduct>();
  @Output() openCart = new EventEmitter<void>();
  @Output() exitToHome = new EventEmitter<void>();

  searchedProducts: BillingProduct[] = [];
  products: BillingProduct[] = [
    { id: 1, name: 'Rice', price: 50 },
    { id: 2, name: 'Sugar', price: 45 },
    { id: 3, name: 'Oil', price: 120 },
    { id: 4, name: 'Milk', price: 60 },
    { id: 5, name: 'Eggs', price: 80 },
    { id: 6, name: 'Bread', price: 40 }
  ];
  

  quantities: { [key: number]: number } = {};
  noProductFound: boolean = false;
  searchText = '';

  totals: BillingTotals = {
    totalItems: 0,
    subTotal: 0,
    gst: 0,
    grandTotal: 0
  };

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {

    this.searchedProducts = [...this.products];
    this.billingService.cart$.subscribe(cart => {

      this.quantities = {};

      let totalItems = 0;
      let subTotal = 0;

      cart.forEach(item => {
        this.quantities[item.id] = item.quantity;

        totalItems += item.quantity;
        subTotal += item.price * item.quantity;
      });

      const gst = +(subTotal * 0.18).toFixed(2);

      this.totals = {
        totalItems,
        subTotal,
        gst,
        grandTotal: +(subTotal + gst).toFixed(2)
      };
    });
  }

  addProduct(product: BillingProduct): void {
    this.productAdded.emit(product);
  }

  increaseQuantity(product: BillingProduct): void {
    this.productAdded.emit(product);
  }

  decreaseQuantity(product: BillingProduct): void {
    this.billingService.removeProduct(product.id);
  }

  getQuantity(productId: number): number {
    return this.quantities[productId] || 0;
  }

  get filteredProducts(): BillingProduct[] {
    if (!this.searchText.trim()) {
      return this.products;
    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewCart(): void {
    this.openCart.emit();
  }

  backToHome(): void {
    this.exitToHome.emit();
  }

  generateBill(): void {
    this.openCart.emit();
  }
 searchProduct(): void {

  const search = this.searchText.trim().toLowerCase();

  if (search === '') {
    this.searchedProducts = [...this.products];
    this.noProductFound = false;
    return;
  }

  this.searchedProducts = this.products.filter(product =>
    product.name.toLowerCase().includes(search)
  );

  this.noProductFound = this.searchedProducts.length === 0;
}

backToProducts(): void {
  this.searchText = '';
  this.noProductFound = false;
  this.searchedProducts = [...this.products];
}
}