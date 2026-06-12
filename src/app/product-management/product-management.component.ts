import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  selectedProducts: any[] = [];

  customer: any = {};

  totalAmount = 0;

  constructor(
    private sharedService: SharedService,
    private toastr: ToastrService
  ) { this.toastr.success('App Started');}

  ngOnInit(): void {

    this.sharedService.messages$
      .subscribe(message => {

        if(message.includes('Product')) {
          this.toastr.success(message);
        }
        else if(message.includes('Customer')) {
          this.toastr.info(message);
        }
        else {
          this.toastr.warning(message);
        }

      });
  }

  addProduct(product: any) {

    this.selectedProducts.push(product);

    this.calculateTotal();
  }

  saveCustomer(customer: any) {

    this.customer = customer;
  }

 calculateTotal() {

  this.totalAmount =
    this.selectedProducts.reduce(
      (sum, item) => sum + item.total,
      0
    );
}

  generateBill() {

    this.toastr.success(
      `Bill Generated Successfully. Total ₹${this.totalAmount}`
    );
  }
}