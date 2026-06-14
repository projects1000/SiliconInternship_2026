import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.css']
})
export class SandwichComponent {

  items = [
    { name: 'Veg Sandwich', price: 3.50, image: 'assets/Anup_grpc_mem4_products/veg-sandwich.webp' },
    { name: 'Grilled Sandwich', price: 4.00, image: 'assets/Anup_grpc_mem4_products/grilled-sandwich.webp' },
    { name: 'Cheese Sandwich', price: 4.50, image: 'assets/Anup_grpc_mem4_products/cheese-sandwich.jpg' },
    { name: 'Club Sandwich', price: 5.00, image: 'assets/Anup_grpc_mem4_products/club-sandwich.webp' },
    { name: 'Chicken Sandwich', price: 5.50, image: 'assets/Anup_grpc_mem4_products/chicken-sandwich.webp' }
  ];
  constructor(private sharedService: SharedService) {}
addToCart(item:any) {

  this.sharedService.addItem(item);

  this.sharedService.addNotification(
    item.name + ' added to cart'
  );

}
}