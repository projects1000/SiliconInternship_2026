import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrpBComponent } from './grp-b/grp-b.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { AttendanceComponent as Member3AttendanceComponent } from './member3/attendance/attendance.component';
import { Member3MaterialModule } from './member3/member3-material.module';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';

import { Member5AttendanceComponent } from './member5/attendance/attendance.component';
import { Member1AttendanceComponent } from './member1/attendance/attendance.component';
import { AttendanceComponent as Member2AttendanceComponent } from './member2/attendance/attendance.component';

import { GrpBRoutingModule } from './grp-b-routing.module';

import { GamingPcBuilderComponent } from './member2/gaming-pc-builder/gaming-pc-builder.component';
import { ProductCatalogComponent } from './member2/gaming-pc-builder/components/product-catalog/product-catalog.component';
import { CustomerDetailsComponent } from './member2/gaming-pc-builder/components/customer-details/customer-details.component';
import { BillSummaryComponent } from './member2/gaming-pc-builder/components/bill-summary/bill-summary.component';
import { CategoryFilterComponent } from './member2/gaming-pc-builder/components/category-filter/category-filter.component';
import { NotificationPanelComponent } from './member2/gaming-pc-builder/components/notification-panel/notification-panel.component';
import { SavedBillsComponent } from './member2/gaming-pc-builder/components/saved-bills/saved-bills.component';

// Toast Notifications
import { ToastrModule } from 'ngx-toastr';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon'; // <-- ADDED THIS CRITICAL LINE
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// Member3: Product Management components (aliasing to avoid name collisions)
import { ProductManagementComponent } from './member3/product-management/product-management.component';
import { ProductListComponent as ProductListMgmtComponent } from './member3/product-management/product-list/product-list.component';
import { CustomerDetailsComponent as ProductCustomerDetailsComponent } from './member3/product-management/customer-details/customer-details.component';
import { BillDetailsComponent as BillDetailsMgmtComponent } from './member3/product-management/bill-details/bill-details.component';
import { NotificationComponent as NotificationMgmtComponent } from './member3/product-management/notification/notification.component';
import { ChattingComponent } from './member3/chatting/chatting.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { CdkTreeModule } from '@angular/cdk/tree';
import { Memb6AttendanceComponent } from './member6/memb6-attendance/memb6-attendance.component';
import { BillingSystemModule as Member1BillingSystemModule } from './member1/billing-system/billing-system.module';
import { Member1WhatsappModule } from './member1/member1-whatsapp/member1-whatsapp.module';
import { ChatWindowComponent } from './member5/chat-window/chat-window.component';
import { ModiComponent } from './member5/modi/modi.component';
import { MeloniComponent } from './member5/meloni/meloni.component';
import { ProductListComponent } from './member5/product-list/product-list.component';
import { BillDetailsComponent } from './member5/bill-details/bill-details.component';
import { NotificationComponent } from './member5/notification/notification.component';
import { WorkflowComponent } from './member5/workflow/workflow.component';

@NgModule({
  declarations: [
    GrpBComponent,
    Member1Component,
    Member2Component,
    Member3Component,
    Member3AttendanceComponent,
    Member4Component,
    Member5Component,
    Member6Component,
    Member5AttendanceComponent,
    Member1AttendanceComponent,
    Member2AttendanceComponent,
    Memb6AttendanceComponent,

    // Member3: Product Management
    ProductManagementComponent,
    ProductListMgmtComponent,
    ProductCustomerDetailsComponent,
    BillDetailsMgmtComponent,
    NotificationMgmtComponent,
    ChattingComponent,

    // ✅ Gaming PC Builder Components — Rohan Nayak (24BCSG13)
    GamingPcBuilderComponent,
    ProductCatalogComponent,
    CustomerDetailsComponent,
    BillSummaryComponent,
    CategoryFilterComponent,
    NotificationPanelComponent,
    SavedBillsComponent,
    ModiComponent,
    MeloniComponent,
    ChatWindowComponent,
    ProductListComponent,
    BillDetailsComponent,
    NotificationComponent,
    WorkflowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GrpBRoutingModule,
    CdkTreeModule,
    MatSidenavModule,
    MatTreeModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule, // <-- This now resolves perfectly
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatBadgeModule,
    Member3MaterialModule,
    Member1BillingSystemModule,
    Member1WhatsappModule,
    ToastrModule,
  ],
})
export class GrpBModule {}

