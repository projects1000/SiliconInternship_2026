import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-fries',
  templateUrl: './fries.component.html',
  styleUrls: ['./fries.component.css']
})
export class FriesComponent {

  items = [
    { name: 'French Fries', price: 2.50, image: 'assets/Anup_grpc_mem4_products/french-fries.webp' },
    { name: 'Peri Peri Fries', price: 3.00, image: 'assets/Anup_grpc_mem4_products/peri-peri-fries.webp' },
    { name: 'Cheese Fries', price: 3.50, image: 'assets/Anup_grpc_mem4_products/cheese-fries.webp' },
    { name: 'Loaded Fries', price: 4.00, image: 'assets/Anup_grpc_mem4_products/loaded-fries.webp' },
    { name: 'Curly Fries', price: 3.25, image: 'assets/Anup_grpc_mem4_products/curly-fries.webp' }
  ];
  constructor(private sharedService: SharedService) {}
  addToCart(item:any) {
  this.sharedService.addItem(item);
  this.sharedService.addNotification(
    item.name + ' added to cart'
  );
}
}