import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { ToastService } from '../shared/toast.service';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  constructor(
    public ps: ProductService,
    private router: Router,
    private customerService: CustomerService,
    private toast: ToastService
  ) {}
checkout() {
  console.log(
  this.customerService.getCurrentCustomer()
);

  const customerData = {
    customer: this.ps.customer,
    products: this.ps.selectedProducts,
    total: this.ps.getTotal(),
    date: new Date()
  };

  // ADD THIS PART
  const currentCustomer =
    this.customerService.getCurrentCustomer();

  if (currentCustomer) {

    this.customerService.createOrder({
      orderDate: new Date(),
      items: [...this.ps.selectedProducts],
      totalAmount: this.ps.getTotal(),
      status: 'confirmed'
    });

  }

  // KEEP YOUR EXISTING CODE
  localStorage.setItem(
    'order',
    JSON.stringify(customerData)
  );

  alert('✅ Order Placed Successfully');

  this.ps.clearCart();

  this.router.navigate(['grp-f/member4/notification']);
}
  goBackToProducts(): void {
  this.router.navigate(['/grp-f/member4/product-management']);
}
}