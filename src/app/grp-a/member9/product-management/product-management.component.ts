import { Component, OnInit } from '@angular/core';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  
  // Default mock inventory data
  defaultProducts: Product[] = [
    { id: 'p_1', name: 'Gaming Mechanical Keyboard', sku: 'KBD-RGB-01', category: 'Peripherals', price: 5499, stock: 25, description: 'Blue switch clicky mechanical keyboard.' },
    { id: 'p_2', name: 'Wireless Gaming Mouse', sku: 'MSE-WRL-02', category: 'Peripherals', price: 3299, stock: 8, description: 'Lightweight 16000 DPI optical sensor.' },
    { id: 'p_3', name: 'UltraWide Monitor 29"', sku: 'MON-UW-29', category: 'Displays', price: 18500, stock: 0, description: '75Hz IPS display with multitasking split view.' },
    { id: 'p_4', name: 'HD Noise Canceling Headset', sku: 'AUD-ANC-04', category: 'Audio', price: 7999, stock: 4, description: 'Active noise cancellation with dual microphones.' }
  ];

  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Search filter string
  searchQuery: string = '';

  // Form flags and state variables
  isEditing: boolean = false;
  editingProductId: string | null = null;

  // Form model bindings
  productName: string = '';
  productSku: string = '';
  productCategory: string = '';
  productPrice: number | null = null;
  productStock: number | null = null;
  productDescription: string = '';

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage(): void {
    const savedData = localStorage.getItem('m9_product_inventory');
    if (savedData) {
      this.products = JSON.parse(savedData);
    } else {
      this.products = [...this.defaultProducts];
      this.saveToLocalStorage();
    }
    this.applyFilter();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('m9_product_inventory', JSON.stringify(this.products));
  }

  applyFilter(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.sku.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }
  }

  onSubmitProduct(): void {
    if (!this.productName.trim() || !this.productSku.trim() || this.productPrice === null || this.productStock === null) {
      alert('Please fill in all mandatory product entries.');
      return;
    }

    if (this.isEditing && this.editingProductId) {
      // Update existing item profile
      this.products = this.products.map(p => {
        if (p.id === this.editingProductId) {
          return {
            ...p,
            name: this.productName.trim(),
            sku: this.productSku.toUpperCase().trim(),
            category: this.productCategory.trim() || 'General',
            price: this.productPrice!,
            stock: this.productStock!,
            description: this.productDescription.trim()
          };
        }
        return p;
      });
      this.isEditing = false;
      this.editingProductId = null;
    } else {
      // Create and inject a brand new product
      const newProduct: Product = {
        id: 'prod_' + Date.now(),
        name: this.productName.trim(),
        sku: this.productSku.toUpperCase().trim(),
        category: this.productCategory.trim() || 'General',
        price: this.productPrice,
        stock: this.productStock,
        description: this.productDescription.trim()
      };
      this.products.push(newProduct);
    }

    this.clearForm();
    this.saveToLocalStorage();
    this.applyFilter();
  }

  onEditProduct(product: Product): void {
    this.isEditing = true;
    this.editingProductId = product.id;
    
    this.productName = product.name;
    this.productSku = product.sku;
    this.productCategory = product.category;
    this.productPrice = product.price;
    this.productStock = product.stock;
    this.productDescription = product.description;
  }

  onDeleteProduct(id: string): void {
    if (confirm('Are you sure you want to completely erase this product from inventory registers?')) {
      this.products = this.products.filter(p => p.id !== id);
      if (this.editingProductId === id) this.clearForm();
      this.saveToLocalStorage();
      this.applyFilter();
    }
  }

  clearForm(): void {
    this.isEditing = false;
    this.editingProductId = null;
    this.productName = '';
    this.productSku = '';
    this.productCategory = '';
    this.productPrice = null;
    this.productStock = null;
    this.productDescription = '';
  }

  getStockBadgeClass(stock: number): string {
    if (stock === 0) return 'badge-out';
    if (stock <= 10) return 'badge-low';
    return 'badge-instock';
  }

  getStockLabel(stock: number): string {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 10) return 'Low Stock';
    return 'In Stock';
  }
}