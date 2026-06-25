import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerDetails } from '../../models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customerName: string = '';
  mobileNumber: string = '';
  
  // @Output event to send customer details UP to parent
  @Output() customerSaved = new EventEmitter<CustomerDetails>();

  constructor(private notificationService: NotificationService) {}

  onSave() {
    // Only save if both fields are filled out
    if (this.customerName && this.mobileNumber) {
      this.customerSaved.emit({ name: this.customerName, mobile: this.mobileNumber });
      
      this.notificationService.sendMessage({ 
        type: 'primary', 
        message: `Customer '${this.customerName}' Saved Successfully` 
      });
    }
  }
}