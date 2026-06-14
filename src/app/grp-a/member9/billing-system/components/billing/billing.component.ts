import { Component, Input } from '@angular/core';
import { CartItem } from '../../models';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  // @Input allows the Parent component to pass data DOWN into these variables
  @Input() cartItems: CartItem[] = [];
  @Input() subTotal: number = 0;
  @Input() gst: number = 0;
  @Input() grandTotal: number = 0;
}