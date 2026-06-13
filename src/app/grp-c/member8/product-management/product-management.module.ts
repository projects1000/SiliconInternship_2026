import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { member8ProductManagementComponent } from './product-management/product-management.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CustomerComponent } from './customer/customer.component';
import { BillingComponent } from './billing/billing.component';
import { NotificationComponent } from './notification/notification.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    member8ProductManagementComponent,
    ProductListComponent,
    CustomerComponent,
    BillingComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class ProductManagementModule { }
