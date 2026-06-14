import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Fixes the 'number' pipe error
import { FormsModule } from '@angular/forms'; // Fixes form element bindings

// Import all local sub-components
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { BillDetailsComponent } from './components/bill-details/bill-details.component';

@NgModule({
  declarations: [
    BillingDashboardComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    BillingDashboardComponent, // Allows member1 component view to render this feature block
  ],
})
export class BillingSystemModule {}
