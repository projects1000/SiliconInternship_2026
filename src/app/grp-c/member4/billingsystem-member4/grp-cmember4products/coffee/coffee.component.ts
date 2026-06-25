import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent {
  items=[
    {name:'Espresso',price:2.5,image:'assets/Anup_grpc_mem4_products/espresso.webp'},
    {name:'Cappuccino',price:3.0,image:'assets/Anup_grpc_mem4_products/cappuccino.webp'},
    {name:'Latte',price:3.5,image:'assets/Anup_grpc_mem4_products/latte.webp'},
    {name:'Americano',price:2.0,image:'assets/Anup_grpc_mem4_products/americano.webp'},
    {name:'Mocha',price:4.0,image:'assets/Anup_grpc_mem4_products/mocha.webp'}
  ]
  constructor(private sharedService: SharedService) {}

addToCart(item:any) {

  this.sharedService.addItem(item);

  this.sharedService.addNotification(
    item.name + ' added to cart'
  );

}
}
