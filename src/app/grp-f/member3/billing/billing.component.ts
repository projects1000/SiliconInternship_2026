import {
  Component,
  Input
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  @Input()
  products: any[] = [];

  @Input()
  customer: any;

  billNumber = 1001;

  billDate = '';

  constructor(
    private snackBar: MatSnackBar
  ) {}

  getTotal() {

    return this.products.reduce(

      (total, product) =>

        total +
        (product.price * product.qty),

      0

    );

  }

  generateBill() {

  this.billDate =
    new Date().toLocaleString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );

  console.log(this.billDate);

  this.snackBar.open(

    `Bill #${this.billNumber} Generated Successfully`,

    'Close',

    {
      duration: 3000
    }

  );

}

  clearBill() {

    this.products.length = 0;

    this.snackBar.open(

      'Bill Cleared Successfully',

      'Close',

      {
        duration: 3000
      }

    );

  }

}