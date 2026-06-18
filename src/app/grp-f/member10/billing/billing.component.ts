import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Product {
  name: string;
  price: number;
  icon: string;
  category: string;
  unit: string;
  popular?: boolean;
}

interface BillItem extends Product {
  qty: number;
}

interface CategoryBreakdown {
  name: string;
  icon: string;
  color: string;
  count: number;
  total: number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  activeTab: 'products' | 'customer' | 'bill' = 'products';
  selectedCategory = 'All';
  searchQuery = '';

  categories = [
    { name: 'All',        icon: '🏪', color: '#4f46e5' },
    { name: 'Grains',     icon: '🌾', color: '#d97706' },
    { name: 'Dairy',      icon: '🥛', color: '#0891b2' },
    { name: 'Vegetables', icon: '🥦', color: '#16a34a' },
    { name: 'Fruits',     icon: '🍎', color: '#dc2626' },
    { name: 'Snacks',     icon: '🍿', color: '#9333ea' },
    { name: 'Beverages',  icon: '☕', color: '#92400e' },
    { name: 'Spices',     icon: '🌶️', color: '#ea580c' },
  ];

  catalogue: Product[] = [
    // Grains
    { name: 'Basmati Rice', price: 80,  icon: '🌾', category: 'Grains',     unit: 'kg',     popular: true  },
    { name: 'Wheat Flour',  price: 45,  icon: '🌿', category: 'Grains',     unit: 'kg'                     },
    { name: 'Sugar',        price: 45,  icon: '🍚', category: 'Grains',     unit: 'kg',     popular: true  },
    { name: 'Brown Rice',   price: 95,  icon: '🌰', category: 'Grains',     unit: 'kg'                     },
    { name: 'Oats',         price: 120, icon: '🥣', category: 'Grains',     unit: 'pack'                   },
    { name: 'Bread',        price: 40,  icon: '🍞', category: 'Grains',     unit: 'loaf',   popular: true  },
    // Dairy
    { name: 'Full Cream Milk', price: 60,  icon: '🥛', category: 'Dairy', unit: 'litre', popular: true },
    { name: 'Butter',          price: 55,  icon: '🧈', category: 'Dairy', unit: '100g'               },
    { name: 'Paneer',          price: 90,  icon: '🧀', category: 'Dairy', unit: '200g', popular: true },
    { name: 'Curd',            price: 40,  icon: '🍶', category: 'Dairy', unit: '500g'               },
    { name: 'Cheese',          price: 110, icon: '🧀', category: 'Dairy', unit: '200g'               },
    { name: 'Eggs',            price: 80,  icon: '🥚', category: 'Dairy', unit: 'dozen', popular: true},
    // Vegetables
    { name: 'Tomato',   price: 30,  icon: '🍅', category: 'Vegetables', unit: 'kg',   popular: true },
    { name: 'Onion',    price: 25,  icon: '🧅', category: 'Vegetables', unit: 'kg',   popular: true },
    { name: 'Potato',   price: 20,  icon: '🥔', category: 'Vegetables', unit: 'kg',   popular: true },
    { name: 'Broccoli', price: 60,  icon: '🥦', category: 'Vegetables', unit: 'pc'                 },
    { name: 'Carrot',   price: 35,  icon: '🥕', category: 'Vegetables', unit: 'kg'                 },
    { name: 'Spinach',  price: 20,  icon: '🥬', category: 'Vegetables', unit: 'bunch'              },
    { name: 'Capsicum', price: 50,  icon: '🫑', category: 'Vegetables', unit: 'kg'                 },
    { name: 'Garlic',   price: 40,  icon: '🧄', category: 'Vegetables', unit: '100g'               },
    // Fruits
    { name: 'Apple',      price: 150, icon: '🍎', category: 'Fruits', unit: 'kg',    popular: true },
    { name: 'Banana',     price: 40,  icon: '🍌', category: 'Fruits', unit: 'dozen', popular: true },
    { name: 'Mango',      price: 120, icon: '🥭', category: 'Fruits', unit: 'kg',    popular: true },
    { name: 'Orange',     price: 80,  icon: '🍊', category: 'Fruits', unit: 'kg'                  },
    { name: 'Grapes',     price: 90,  icon: '🍇', category: 'Fruits', unit: 'kg'                  },
    { name: 'Watermelon', price: 30,  icon: '🍉', category: 'Fruits', unit: 'pc'                  },
    { name: 'Pineapple',  price: 60,  icon: '🍍', category: 'Fruits', unit: 'pc'                  },
    // Snacks
    { name: 'Biscuits',  price: 30,  icon: '🍪', category: 'Snacks', unit: 'pack', popular: true },
    { name: 'Chips',     price: 20,  icon: '🥔', category: 'Snacks', unit: 'pack', popular: true },
    { name: 'Popcorn',   price: 25,  icon: '🍿', category: 'Snacks', unit: 'pack'               },
    { name: 'Namkeen',   price: 35,  icon: '🥨', category: 'Snacks', unit: 'pack'               },
    { name: 'Chocolate', price: 60,  icon: '🍫', category: 'Snacks', unit: 'bar',  popular: true },
    { name: 'Cake',      price: 250, icon: '🎂', category: 'Snacks', unit: 'pc'                 },
    // Beverages
    { name: 'Tea',          price: 120, icon: '🍵', category: 'Beverages', unit: '250g', popular: true },
    { name: 'Coffee',       price: 180, icon: '☕', category: 'Beverages', unit: '200g', popular: true },
    { name: 'Juice',        price: 60,  icon: '🧃', category: 'Beverages', unit: '1 L'               },
    { name: 'Cold Drink',   price: 40,  icon: '🥤', category: 'Beverages', unit: 'bottle'             },
    { name: 'Water',        price: 20,  icon: '💧', category: 'Beverages', unit: '1 L'               },
    { name: 'Energy Drink', price: 90,  icon: '⚡', category: 'Beverages', unit: 'can'               },
    // Spices
    { name: 'Salt',         price: 20,  icon: '🧂', category: 'Spices', unit: 'kg',   popular: true },
    { name: 'Turmeric',     price: 55,  icon: '🌿', category: 'Spices', unit: '100g'               },
    { name: 'Red Chilli',   price: 60,  icon: '🌶️', category: 'Spices', unit: '100g', popular: true},
    { name: 'Cumin',        price: 70,  icon: '🌱', category: 'Spices', unit: '100g'               },
    { name: 'Garam Masala', price: 80,  icon: '🫙', category: 'Spices', unit: '100g', popular: true },
    { name: 'Mustard',      price: 45,  icon: '🟡', category: 'Spices', unit: '100g'               },
    { name: 'Cooking Oil',  price: 160, icon: '🫙', category: 'Spices', unit: 'litre', popular: true},
  ];

  billItems: BillItem[] = [];
  customerName  = '';
  mobileNumber  = '';
  customerSaved = false;
  billGenerated = false;

  readonly GST = 0.18;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  get subTotal()   { return this.billItems.reduce((s, i) => s + i.price * i.qty, 0); }
  get gstAmount()  { return parseFloat((this.subTotal * this.GST).toFixed(2)); }
  get grandTotal() { return parseFloat((this.subTotal + this.gstAmount).toFixed(2)); }
  get totalQty()   { return this.billItems.reduce((s, i) => s + i.qty, 0); }
  get savings()    { return parseFloat((this.subTotal * 0.05).toFixed(2)); }

  get filteredProducts(): Product[] {
    return this.catalogue.filter(p => {
      const matchCat    = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  get popularProducts(): Product[] {
    return this.catalogue.filter(p => p.popular);
  }

  getCategoryColor(name: string): string {
    return this.categories.find(c => c.name === name)?.color ?? '#4f46e5';
  }

  getCategoryIcon(name: string): string {
    return this.categories.find(c => c.name === name)?.icon ?? '📦';
  }

  getCategoryCount(name: string): number {
    if (name === 'All') return this.catalogue.length;
    return this.catalogue.filter(p => p.category === name).length;
  }

  getCategoryBreakdown(): CategoryBreakdown[] {
    const map = new Map<string, CategoryBreakdown>();
    for (const item of this.billItems) {
      if (!map.has(item.category)) {
        map.set(item.category, {
          name:  item.category,
          icon:  this.getCategoryIcon(item.category),
          color: this.getCategoryColor(item.category),
          count: 0,
          total: 0
        });
      }
      const entry = map.get(item.category)!;
      entry.count += item.qty;
      entry.total += item.price * item.qty;
    }
    return Array.from(map.values());
  }

  getQty(name: string)  { return this.billItems.find(i => i.name === name)?.qty ?? 0; }
  getItem(name: string) { return this.billItems.find(i => i.name === name)!; }

  addToCart(p: Product) {
    const found = this.billItems.find(i => i.name === p.name);
    found ? found.qty++ : this.billItems.push({ ...p, qty: 1 });
    this.toast(`${p.icon} ${p.name} added to bill!`, 'product');
  }

  increment(item: BillItem) { item.qty++; }

  decrement(item: BillItem) {
    item.qty > 1 ? item.qty-- : this.removeItem(item);
  }

  removeItem(item: BillItem) {
    this.billItems = this.billItems.filter(i => i.name !== item.name);
    this.toast(`🗑️ ${item.name} removed!`, 'warn');
  }

  clearCart() {
    this.billItems = [];
    this.toast('🛒 Cart cleared!', 'warn');
  }

  saveCustomer() {
    if (!this.customerName.trim()) {
      this.toast('⚠️ Please enter customer name!', 'warn'); return;
    }
    if (!/^\d{10}$/.test(this.mobileNumber)) {
      this.toast('⚠️ Enter a valid 10-digit mobile number!', 'warn'); return;
    }
    this.customerSaved = true;
    this.toast('👤 Customer saved successfully!', 'customer');
    this.activeTab = 'bill';
  }

  editCustomer() {
    this.customerSaved = false;
    this.billGenerated = false;
  }

  generateBill() {
    if (!this.customerSaved) {
      this.toast('⚠️ Please save customer details first!', 'warn');
      this.activeTab = 'customer'; return;
    }
    if (this.billItems.length === 0) {
      this.toast('⚠️ Please add at least one product!', 'warn');
      this.activeTab = 'products'; return;
    }
    this.billGenerated = true;
    this.toast('🧾 Bill generated successfully!', 'bill');
  }

  resetAll() {
    this.billItems        = [];
    this.customerName     = '';
    this.mobileNumber     = '';
    this.customerSaved    = false;
    this.billGenerated    = false;
    this.activeTab        = 'products';
    this.searchQuery      = '';
    this.selectedCategory = 'All';
    this.toast('🔄 Reset! Ready for new bill.', 'product');
  }

  goBack() { this.router.navigate(['/member10']); }

  private toast(msg: string, type: 'product' | 'customer' | 'bill' | 'warn') {
    const panel =
      type === 'warn'     ? 'toast-warn'     :
      type === 'customer' ? 'toast-customer' :
      type === 'bill'     ? 'toast-bill'     : 'toast-product';
    this.snackBar.open(msg, '✕', {
      duration: 3000,
      panelClass: [panel],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}