import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent {

  items = [
    {
      name: 'Margherita Pizza',
      price: 4.50,
      image: 'assets/Anup_grpc_mem4_products/margherita.jpg'
    },
    {
      name: 'Cheese Pizza',
      price: 5.00,
      image: 'assets/Anup_grpc_mem4_products/cheese-pizza.webp'
    },
    {
      name: 'Pepperoni Pizza',
      price: 6.00,
      image: 'assets/Anup_grpc_mem4_products/pepperoni.webp'
    },
    {
      name: 'Veggie Pizza',
      price: 5.50,
      image: 'assets/Anup_grpc_mem4_products/veggie-pizza.webp'
    },
    {
      name: 'BBQ Pizza',
      price: 6.50,
      image: 'assets/Anup_grpc_mem4_products/bbq-pizza.webp'
    }
  ];
  constructor(private sharedService: SharedService) {}

addToCart(item:any) {

  this.sharedService.addItem(item);

  this.sharedService.addNotification(
    item.name + ' added to cart'
  );

}
}