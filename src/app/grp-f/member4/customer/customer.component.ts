import { Component, OnInit } from '@angular/core';
import { ToastService } from '../shared/toast.service';
import { ProductService } from '../shared/product.service';

interface Customer {
  name: string;
  mobile: string;
  email:string;
  address: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  // Customer Model
  customer: Customer = {
  name: '',
  mobile: '',
  email: '',
  address: ''
};
  // Inject services
  constructor(
    public ps: ProductService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // Load existing customer if already saved
    if (this.ps.customer) {
      this.customer = this.ps.customer;
    }
  }

  // Save Customer (real-world flow)
 saveCustomer(): void {

  if (!this.customer.name || !this.customer.mobile || !this.customer.email) {
    alert('Please fill all required fields');
    return;
  }

  this.ps.customer = { ...this.customer };

  console.log('Saved Customer:', this.customer);
}

  // Optional: reset form
  resetCustomer(): void {
    this.customer = {
      name: '',
      mobile: '',
      email: '',
      address: ''
    };

    this.toast.show('Form reset', 'info');
  }
}