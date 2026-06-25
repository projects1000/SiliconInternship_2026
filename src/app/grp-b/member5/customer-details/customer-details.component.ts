import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {

  customerName='';
  mobile='';

  @Output()
  saveCustomer=new EventEmitter<any>();

  save(){
    this.saveCustomer.emit({
      name:this.customerName,
      mobile:this.mobile
    });
  }

}