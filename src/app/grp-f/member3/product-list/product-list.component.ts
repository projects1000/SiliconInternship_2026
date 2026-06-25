import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { BillingService }
from '../services/billing.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Output()
  productAdded =
    new EventEmitter<any>();

  constructor(
    private billingService: BillingService
  ) {}

  products = [

    {
      name: 'Rice',
      price: 50
    },

    {
      name: 'Sugar',
      price: 45
    },

    {
      name: 'Oil',
      price: 120
    },

    {
      name: 'Milk',
      price: 60
    }

  ];

  addProduct(product: any) {

    this.productAdded.emit({

      ...product,

      qty: 1

    });

    this.billingService.sendNotification(

      `Product '${product.name}' Added Successfully`

    );

  }

}