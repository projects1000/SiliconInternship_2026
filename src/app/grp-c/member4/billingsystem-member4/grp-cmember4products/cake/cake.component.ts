import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent {

  items = [
    { name: 'Chocolate Cake', price: 4.50, image: 'assets/Anup_grpc_mem4_products/chocolate-cake.webp' },
    { name: 'Black Forest Cake', price: 5.50, image: 'assets/Anup_grpc_mem4_products/black-forest-cake.webp' },
    { name: 'Red Velvet Cake', price: 6.00, image: 'assets/Anup_grpc_mem4_products/red-velvet-cake.webp' },
    { name: 'Strawberry Cake', price: 5.00, image: 'assets/Anup_grpc_mem4_products/strawberry-cake.webp' },
    { name: 'Vanilla Cake', price: 4.00, image: 'assets/Anup_grpc_mem4_products/vanilla-cake.webp' }
  ];
  constructor(private sharedService: SharedService) {}
  addToCart(item:any) {
  this.sharedService.addItem(item);
}
}