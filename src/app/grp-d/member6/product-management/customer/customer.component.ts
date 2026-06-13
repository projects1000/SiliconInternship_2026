import { Component } from '@angular/core';
import { MessageService } from '../../product-management/services/message.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customer = {
    name: '',
    email: '',
    phone: ''
  };

  constructor(private messageService: MessageService) {}

  saveCustomer() {

    if (!this.customer.name || !this.customer.phone) {
      this.messageService.showToast('error', 'Please fill required fields');
      return;
    }

    // SAVE CUSTOMER
    this.messageService.setCustomer({
      customerName: this.customer.name,
      email: this.customer.email,
      phone: this.customer.phone
    });

    this.messageService.showToast(
      'success',
      'Customer saved successfully'
    );

    this.customer = {
      name: '',
      email: '',
      phone: ''
    };
  }
}
