import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {

  @Input() cart:any[]=[];

  get subtotal(){
    return this.cart.reduce((a,b)=>a+b.price,0);
  }

  get gst(){
    return this.subtotal*0.18;
  }

  get total(){
    return this.subtotal+this.gst;
  }

}