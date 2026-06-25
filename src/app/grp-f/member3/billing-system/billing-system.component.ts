import { Component } from '@angular/core';
import { BillingService } from '../services/billing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-billing-system',
  templateUrl: './billing-system.component.html',
  styleUrls: ['./billing-system.component.css']
})
export class BillingSystemComponent {

  selectedProducts: any[] = [];

  customer: any = {};

  notifications: string[] = [];

  constructor(
    private billingService: BillingService,
    private snackBar: MatSnackBar
  ) {

    this.billingService.notification$
      .subscribe(message => {

        this.notifications.push(message);

        this.snackBar.open(
          message,
          'Close',
          {
            duration: 2000
          }
        );

      });

  }

  addProduct(product: any) {

    this.selectedProducts.push(product);

  }

  saveCustomer(customer: any) {

    this.customer = customer;

  }

}