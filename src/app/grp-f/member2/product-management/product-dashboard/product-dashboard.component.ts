import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent {

  selectedCategory = 'Skincare';

  customerData: any = {};

  selectedProducts: any[] = [];
  productHistory:any[] = [];
  totalAmount = 0;

  constructor(
    private snackBar: MatSnackBar
  ) {}

  selectCategory(category:string){

    this.selectedCategory = category;

  }

  receiveProduct(product:any){

    this.selectedProducts.push(product);

    this.calculateTotal();

    this.snackBar.open(

      'Product Added Successfully 🛒',

      'Close',

      {
        duration:3000
      }

    );

  }

  receiveCustomer(customer:any){

    this.customerData = customer;

    this.snackBar.open(

      'Customer Saved Successfully 👤',

      'Close',

      {
        duration:3000
      }

    );

  }

  calculateTotal(){

    this.totalAmount =

      this.selectedProducts.reduce(

        (sum,item)=>sum + item.price,

        0

      );

  }
  saveBill(){

  const bill = {

    invoiceNo:

      'INV-' +

      Date.now(),

    customer:

      this.customerData,

    amount:

      this.totalAmount,

    date:

      new Date()

  };

  this.productHistory.push(
    bill
  );

}
}