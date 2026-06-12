import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  @Input() products: any[] = [];

  @Input() customer: any = {};

  @Input() totalAmount: number = 0;

}