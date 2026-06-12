import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent {

  constructor(
    public ps: ProductService,
    private router: Router
  ) {}

  checkout() {

    const customerData = {
      customer: this.ps.customer,
      products: this.ps.selectedProducts,
      total: this.ps.getTotal(),
      date: new Date()
    };

    localStorage.setItem(
      'order',
      JSON.stringify(customerData)
    );

    alert('✅ Order Placed Successfully');

    this.ps.clearCart();

    this.router.navigate(['grp-f/member4/notification']);
  }
}