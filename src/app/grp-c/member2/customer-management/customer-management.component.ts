import { Component, EventEmitter, Output } from '@angular/core';
import { NotificationService }
  from '../services/notification.service';

export interface Customer {
  name: string;
  mobile: string;
}

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent {

  @Output()
  customerSaved = new EventEmitter<Customer>();

  constructor(
    private notificationService: NotificationService
  ) { }

  customer: Customer = {
    name: '',
    mobile: ''
  };

  saveCustomer() {

    this.customerSaved.emit({ ...this.customer });

    this.notificationService.sendMessage(
      `Customer ${this.customer.name} saved successfully`
    );

  }

}
