import { Component, Input } from '@angular/core';
import { MatSnackBar }
from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import {
 Output,
 EventEmitter
}
from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  @Output()

billGenerated =

new EventEmitter();
  @Input() cartItems: any[] = [];

  @Input() customer: any;
  constructor(
  private snackBar: MatSnackBar
){}
generateBill(){

  this.snackBar.open(

    'Bill Generated Successfully',

    'Close',

    {
      duration:3000
    }

  );
  this.billGenerated.emit();

}

  getTotalAmount(): number {

    return this.cartItems.reduce(

      (total, item) => total + item.price,

      0

    );

  }
  getSubtotal(): number {

  return this.cartItems.reduce(

    (sum,item)=>
    sum + item.price,

    0

  );

}

getGST(): number {

  return this.getSubtotal() * 0.18;

}

getGrandTotal(): number {

  return this.getSubtotal() +
         this.getGST();

}
downloadInvoice(){

  const pdf = new jsPDF();

  pdf.setFontSize(18);

  pdf.text(
    'Invoice',
    20,
    20
  );

  pdf.text(
    `Customer: ${this.customer?.name}`,
    20,
    40
  );

  pdf.text(
    `Mobile: ${this.customer?.mobile}`,
    20,
    50
  );

  let y = 70;

  this.cartItems.forEach(item=>{

    pdf.text(

      `${item.name} - ₹${item.price}`,

      20,

      y

    );

    y += 10;

  });

  pdf.text(

    `Grand Total: ₹${this.getGrandTotal()}`,

    20,

    y + 20

  );

  pdf.save(
    'invoice.pdf'
  );

}

}