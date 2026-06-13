import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  @Output() customerSaved = new EventEmitter<any>();

  name: string = '';
  mobile: string = '';

  saveCustomer() {
    this.customerSaved.emit({
      name: this.name,
      mobile: this.mobile
    });
  }
}