import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- 1. Import FormsModule here

import { BillingSystemRoutingModule } from './billing-system-routing.module';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CustomerComponent } from './components/customer/customer.component';
import { BillingComponent } from './components/billing/billing.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    BillingDashboardComponent,
    ProductListComponent,
    CustomerComponent,
    BillingComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    BillingSystemRoutingModule,
    FormsModule // <-- 2. Add it to the imports array
  ],
  exports: [
    BillingDashboardComponent // <-- 3. Export the dashboard so member9 can use it
  ]
})
export class BillingSystemModule { }