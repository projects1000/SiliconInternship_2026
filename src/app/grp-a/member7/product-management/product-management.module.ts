import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { NotificationService } from './notification.service';

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductManagementRoutingModule
  ],
  providers: [
    NotificationService
  ]
})
export class ProductManagementModule {}
