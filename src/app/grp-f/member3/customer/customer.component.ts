import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

import { BillingService }
from '../services/billing.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  @Output()
  customerSaved =
    new EventEmitter<any>();

  constructor(
    private billingService: BillingService
  ) {}

  customer = {

    name: '',

    mobile: ''

  };

  saveCustomer() {

    this.customerSaved.emit(
      this.customer
    );

    this.billingService.sendNotification(

      `Customer '${this.customer.name}' Saved Successfully`

    );

  }

}