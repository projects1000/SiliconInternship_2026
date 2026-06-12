import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plant } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // 1. Available stock
  private allPlants: Plant[] = [
    { id: 1, name: 'Snake Plant', category: 'Hardy', price: 15.0, stock: 5, image: 'assets/snake.jpg' },
    { id: 2, name: 'Aloe Vera', category: 'Medicinal', price: 10.0, stock: 8, image: 'assets/aloe.jpg' }
  ];

  // 2. User's selected items (The Cart)
  private cart: Plant[] = [];

  constructor(private snackBar: MatSnackBar) {}

  // Fetch all available products
  getItems(): Plant[] { 
    return this.allPlants; 
  }

  // Add to cart and trigger notification
  addToCart(plant: Plant) {
    this.cart.push(plant);
    this.snackBar.open(`${plant.name} added to your build!`, 'Close', { 
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top' 
    });
  }

  // Retrieve selected items for the Bill/Cart page
  getCart(): Plant[] { 
    return this.cart; 
  }

  // Calculate total price for the bill
  getTotalPrice(): number {
    return this.cart.reduce((total, plant) => total + plant.price, 0);
  }
}