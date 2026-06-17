import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartItems:any[] = [];

  addProduct(product:any){

    this.cartItems.push(product);

  }

  getProducts(){

    return this.cartItems;

  }

}