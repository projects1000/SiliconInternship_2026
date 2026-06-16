import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent {

  items = [
    {
      name: 'Coca Cola',
      price: 1.50,
      image: 'assets/Anup_grpc_mem4_products/coke.webp'
    },
    {
      name: 'Pepsi',
      price: 1.50,
      image: 'assets/Anup_grpc_mem4_products/pepsi.webp'
    },
    {
      name: 'Sprite',
      price: 1.25,
      image: 'assets/Anup_grpc_mem4_products/sprite.png'
    },
    {
      name: 'Orange Juice',
      price: 2.00,
      image: 'assets/Anup_grpc_mem4_products/orangejuice.webp'
    },
    {
      name: 'Lemon Juice',
      price: 1.75,
      image: 'assets/Anup_grpc_mem4_products/lemonjuice.webp'
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