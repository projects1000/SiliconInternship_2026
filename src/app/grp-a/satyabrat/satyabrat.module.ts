import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductListComponent } from './product-management/components/product-list/product-list.component';
import { CustomerDetailsComponent } from './product-management/components/customer-details/customer-details.component';
import { BillDetailsComponent } from './product-management/components/bill-details/bill-details.component';
import { NotificationPanelComponent } from './product-management/components/notification-panel/notification-panel.component';
import { ProductLoginComponent } from './product-management/components/login/product-login.component';
import { BillingService } from './product-management/services/billing.service';

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    NotificationPanelComponent,
    ProductLoginComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    ProductManagementComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    NotificationPanelComponent,
    ProductLoginComponent
  ],
  providers: [
    BillingService
  ]
})
export class SatyabratModule { }
