import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.component.html',
  styleUrls: ['./pasta.component.css']
})
export class PastaComponent {

  items = [
    { name: 'White Sauce Pasta', price: 5.50, image: 'assets/Anup_grpc_mem4_products/white-sauce-pasta.webp' },
    { name: 'Red Sauce Pasta', price: 5.00, image: 'assets/Anup_grpc_mem4_products/red-sauce-pasta.webp' },
    { name: 'Pink Sauce Pasta', price: 6.00, image: 'assets/Anup_grpc_mem4_products/pink-sauce-pasta.webp' },
    { name: 'Alfredo Pasta', price: 6.50, image: 'assets/Anup_grpc_mem4_products/alfredo-pasta.webp' },
    { name: 'Cheesy Pasta', price: 7.00, image: 'assets/Anup_grpc_mem4_products/cheesy-pasta.webp' }
  ];
  constructor(private sharedService: SharedService) {}
  addToCart(item:any) {

  this.sharedService.addItem(item);

  this.sharedService.addNotification(
    item.name + ' added to cart'
  );

}
}