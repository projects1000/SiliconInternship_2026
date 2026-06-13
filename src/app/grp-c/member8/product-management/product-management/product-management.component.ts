import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  constructor(
  private notificationService: NotificationService
) {}
  
  selectedProducts:any[] = [];

receiveProduct(product:any){
   
if(product.action === 'added'){
  this.notificationService.show(
    `${product.name} Added Successfully`
  );
}
else{
  this.notificationService.show(
    `${product.name} Removed Successfully`
  );
}

  console.log('Parent received:', product);

  const index = this.selectedProducts.findIndex(
    p => p.name === product.name
  );

  if(index > -1){
    this.selectedProducts[index] = product;
  } else {
    this.selectedProducts.push(product);
  }
}
customerData: any = {};

receiveCustomer(customer:any){

  this.customerData = customer;
   this.notificationService.show(
  `Customer '${customer.name}' Saved Successfully`
  );
  console.log('Customer received:', customer);
}
onBillGenerated(){

  if (this.selectedProducts.length === 0) {
      this.notificationService.show('Please add products');
      return;
    }

    if (!this.customerData.name) {
      this.notificationService.show('Please save customer details');
      return;
    }

    this.notificationService.show(
      `Bill Generated Successfully. Total ₹${this.selectedProducts.reduce(
 (sum,p)=>sum+(p.price*p.qty),0
)}`
    );
}

}
