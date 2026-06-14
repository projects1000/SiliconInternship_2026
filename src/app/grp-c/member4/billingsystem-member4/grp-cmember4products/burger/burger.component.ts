import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent {

  items = [
    { name: 'Classic Burger', price: 4.00, image: 'assets/Anup_grpc_mem4_products/classic-burger.webp' },
    { name: 'Cheese Burger', price: 4.50, image: 'assets/Anup_grpc_mem4_products/cheese-burger.webp' },
    { name: 'Chicken Burger', price: 5.00, image: 'assets/Anup_grpc_mem4_products/chicken-burger.webp' },
    { name: 'Veg Burger', price: 3.50, image: 'assets/Anup_grpc_mem4_products/veg-burger.webp' },
    { name: 'Fish Burger', price: 6.00, image: 'assets/Anup_grpc_mem4_products/fish-burger.webp' }
  ];
  constructor(private sharedService: SharedService) {}
  addToCart(item:any) {
  this.sharedService.addItem(item);
}
}