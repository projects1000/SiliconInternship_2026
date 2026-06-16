// member1/billing-system/components/product-list/product-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, CartItem } from '../../models/billing.model';
import { BillingJagannathService as BillingSharedService } from '../../services/billing-jagannath.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() cartItems: CartItem[] = []; // Receives live basket state data from parent dashboard container
  @Output() productAdded = new EventEmitter<Product>();
  @Output() productRemoved = new EventEmitter<Product>(); // Emits back up to parent to handle deletion calculation updates

  categories: string[] = [
    'Grains',
    'Oils',
    'Dairy',
    'Bakery',
    'Beverages',
    'Snacks',
    'Spices',
    'Vegetables',
    'Fruits',
    'Cleaners',
  ];

  selectedCategory: string = 'Grains';

  allProducts: Product[] = [
    // Grains
    {
      id: 1,
      name: 'Premium Basmati Rice',
      price: 60,
      category: 'Grains',
      image: 'assets/products_jagannath/rice.png',
    },
    {
      id: 2,
      name: 'Brown Rice',
      price: 75,
      category: 'Grains',
      image: 'assets/products_jagannath/brown-rice.png',
    },
    {
      id: 3,
      name: 'Whole Wheat Atta 5kg',
      price: 210,
      category: 'Grains',
      image: 'assets/products_jagannath/atta.png',
    },
    {
      id: 4,
      name: 'Organic Sugar',
      price: 45,
      category: 'Grains',
      image: 'assets/products_jagannath/sugar.png',
    },
    {
      id: 5,
      name: 'Toor Dal',
      price: 130,
      category: 'Grains',
      image: 'assets/products_jagannath/toor-dal.png',
    },
    {
      id: 6,
      name: 'Moong Dal',
      price: 120,
      category: 'Grains',
      image: 'assets/products_jagannath/moong-dal.png',
    },

    // Oils
    {
      id: 7,
      name: 'Sunflower Oil',
      price: 135,
      category: 'Oils',
      image: 'assets/products_jagannath/sunflower-oil.png',
    },
    {
      id: 8,
      name: 'Olive Oil Extra Virgin',
      price: 450,
      category: 'Oils',
      image: 'assets/products_jagannath/olive-oil.png',
    },
    {
      id: 9,
      name: 'Mustard Oil',
      price: 160,
      category: 'Oils',
      image: 'assets/products_jagannath/mustard-oil.png',
    },
    {
      id: 10,
      name: 'Groundnut Oil',
      price: 190,
      category: 'Oils',
      image: 'assets/products_jagannath/groundnut-oil.png',
    },

    // Dairy
    {
      id: 11,
      name: 'Fresh Whole Milk',
      price: 30,
      category: 'Dairy',
      image: 'assets/products_jagannath/milk.png',
    },
    {
      id: 12,
      name: 'Salted Butter',
      price: 55,
      category: 'Dairy',
      image: 'assets/products_jagannath/butter.png',
    },
    {
      id: 13,
      name: 'Paneer Block 200g',
      price: 85,
      category: 'Dairy',
      image: 'assets/products_jagannath/paneer.png',
    },
    {
      id: 14,
      name: 'Cheddar Cheese',
      price: 180,
      category: 'Dairy',
      image: 'assets/products_jagannath/cheese.png',
    },
    {
      id: 15,
      name: 'Greek Yogurt',
      price: 90,
      category: 'Dairy',
      image: 'assets/products_jagannath/yogurt.png',
    },

    // Bakery
    {
      id: 16,
      name: 'Whole Wheat Bread',
      price: 40,
      category: 'Bakery',
      image: 'assets/products_jagannath/bread.png',
    },
    {
      id: 17,
      name: 'Butter Croissants',
      price: 60,
      category: 'Bakery',
      image: 'assets/products_jagannath/croissant.png',
    },
    {
      id: 18,
      name: 'Chocolate Muffins',
      price: 80,
      category: 'Bakery',
      image: 'assets/products_jagannath/muffin.png',
    },
    {
      id: 19,
      name: 'Vanilla Cake',
      price: 250,
      category: 'Bakery',
      image: 'assets/products_jagannath/cake.png',
    },

    // Beverages
    {
      id: 20,
      name: 'Pure Assam Tea',
      price: 120,
      category: 'Beverages',
      image: 'assets/products_jagannath/tea.png',
    },
    {
      id: 21,
      name: 'Filter Coffee Powder',
      price: 145,
      category: 'Beverages',
      image: 'assets/products_jagannath/coffee.png',
    },
    {
      id: 22,
      name: 'Orange Juice',
      price: 90,
      category: 'Beverages',
      image: 'assets/products_jagannath/juice.png',
    },
    {
      id: 23,
      name: 'Cola Drink',
      price: 45,
      category: 'Beverages',
      image: 'assets/products_jagannath/cola.png',
    },
    {
      id: 24,
      name: 'Energy Drink',
      price: 110,
      category: 'Beverages',
      image: 'assets/products_jagannath/energy_drink.png',
    },

    // Snacks
    {
      id: 25,
      name: 'Chocolate Chip Cookies',
      price: 80,
      category: 'Snacks',
      image: 'assets/products_jagannath/cookies.png',
    },
    {
      id: 26,
      name: 'Potato Chips Salted',
      price: 20,
      category: 'Snacks',
      image: 'assets/products_jagannath/chips.png',
    },
    {
      id: 27,
      name: 'Salted Peanuts',
      price: 35,
      category: 'Snacks',
      image: 'assets/products_jagannath/peanuts.png',
    },
    {
      id: 28,
      name: 'Nachos',
      price: 70,
      category: 'Snacks',
      image: 'assets/products_jagannath/nachos.png',
    },
    {
      id: 29,
      name: 'Popcorn',
      price: 50,
      category: 'Snacks',
      image: 'assets/products_jagannath/popcorn.png',
    },
    {
      id: 30,
      name: 'Crackers',
      price: 45,
      category: 'Snacks',
      image: 'assets/products_jagannath/crackers.png',
    },

    // Spices
    {
      id: 31,
      name: 'Turmeric Powder',
      price: 65,
      category: 'Spices',
      image: 'assets/products_jagannath/turmeric.png',
    },
    {
      id: 32,
      name: 'Red Chilli Powder',
      price: 70,
      category: 'Spices',
      image: 'assets/products_jagannath/chilli-powder.png',
    },
    {
      id: 33,
      name: 'Garam Masala',
      price: 95,
      category: 'Spices',
      image: 'assets/products_jagannath/garam-masala.png',
    },
    {
      id: 34,
      name: 'Coriander Powder',
      price: 60,
      category: 'Spices',
      image: 'assets/products_jagannath/coriander-powder.png',
    },
    {
      id: 35,
      name: 'Black Pepper',
      price: 140,
      category: 'Spices',
      image: 'assets/products_jagannath/black-pepper.png',
    },

    // Vegetables
    {
      id: 36,
      name: 'Potatoes 1kg',
      price: 30,
      category: 'Vegetables',
      image: 'assets/products_jagannath/potato.png',
    },
    {
      id: 37,
      name: 'Tomatoes 1kg',
      price: 40,
      category: 'Vegetables',
      image: 'assets/products_jagannath/tomato.png',
    },
    {
      id: 38,
      name: 'Cabbage',
      price: 35,
      category: 'Vegetables',
      image: 'assets/products_jagannath/cabbage.png',
    },
    {
      id: 39,
      name: 'Onions 1kg',
      price: 50,
      category: 'Vegetables',
      image: 'assets/products_jagannath/onion.png',
    },
    {
      id: 40,
      name: 'Carrots 1kg',
      price: 60,
      category: 'Vegetables',
      image: 'assets/products_jagannath/carrot.png',
    },
    {
      id: 41,
      name: 'Cauliflower',
      price: 45,
      category: 'Vegetables',
      image: 'assets/products_jagannath/cauliflower.png',
    },

    // Fruits
    {
      id: 42,
      name: 'Red Apples',
      price: 180,
      category: 'Fruits',
      image: 'assets/products_jagannath/apple.png',
    },
    {
      id: 43,
      name: 'Bananas',
      price: 70,
      category: 'Fruits',
      image: 'assets/products_jagannath/banana.png',
    },
    {
      id: 44,
      name: 'Oranges',
      price: 120,
      category: 'Fruits',
      image: 'assets/products_jagannath/orange.png',
    },
    {
      id: 45,
      name: 'Mangoes',
      price: 220,
      category: 'Fruits',
      image: 'assets/products_jagannath/mango.png',
    },
    {
      id: 46,
      name: 'Grapes',
      price: 140,
      category: 'Fruits',
      image: 'assets/products_jagannath/grapes.png',
    },

    // Cleaners
    {
      id: 47,
      name: 'Floor Cleaner',
      price: 150,
      category: 'Cleaners',
      image: 'assets/products_jagannath/floor-cleaner.png',
    },
    {
      id: 48,
      name: 'Dish Wash Liquid',
      price: 95,
      category: 'Cleaners',
      image: 'assets/products_jagannath/dishwash.png',
    },
    {
      id: 49,
      name: 'Toilet Cleaner',
      price: 125,
      category: 'Cleaners',
      image: 'assets/products_jagannath/toilet-cleaner.png',
    },
    {
      id: 50,
      name: 'Glass Cleaner',
      price: 110,
      category: 'Cleaners',
      image: 'assets/products_jagannath/glass-cleaner.png',
    },
  ];

  constructor(private sharedService: BillingSharedService) {}

  get filteredProducts(): Product[] {
    return this.allProducts.filter((p) => p.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  // Verifies if product instance actively sits inside our dashboard item model collection
  isProductInCart(product: Product): boolean {
    return this.cartItems.some((item) => item.product.id === product.id);
  }

  toggleProductBillState(product: Product) {
    if (this.isProductInCart(product)) {
      this.productRemoved.emit(product);
      this.sharedService.sendNotification(
        `"${product.name}" removed from the bill registry.`,
        'warning',
      );
    } else {
      this.productAdded.emit(product);
      this.sharedService.sendNotification(
        `"${product.name}" added to item cart!`,
        'success',
      );
    }
  }
}
