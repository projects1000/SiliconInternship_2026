import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-management',
  templateUrl: './billing-management.component.html',
  styleUrls: ['./billing-management.component.css']
})
export class BillingManagementComponent implements OnInit {

  cart:any[]=[];

  customer:any={
    name:'',
    mobile:''
  };

  ngOnInit(){

    this.cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

  }

  removeItem(index:number){

    this.cart.splice(index,1);

    localStorage.setItem(
      'cart',
      JSON.stringify(this.cart)
    );

  }

  getTotal(){

    return this.cart.reduce(
      (sum,item)=>sum+item.price,
      0
    );

  }

  getGST(){

    return (
      this.getTotal()*18/100
    ).toFixed(2);

  }

  getGrandTotal(){

    return (
      this.getTotal() +
      Number(this.getGST())
    ).toFixed(2);

  }

  proceedToCheckout(){

    if(this.cart.length===0){

      alert('Cart Empty');

      return;

    }

    if(!this.customer.name){

      alert(
        'Enter Customer Details'
      );

      return;

    }

    alert(
      'Order Placed Successfully ✅'
    );

    localStorage.removeItem('cart');

    this.cart=[];

    this.customer={
      name:'',
      mobile:''
    };

  }

}