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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { CdkTreeModule } from '@angular/cdk/tree';
import { Memb6AttendanceComponent } from './member6/memb6-attendance/memb6-attendance.component';
import { BillingSystemModule as Member1BillingSystemModule } from './member1/billing-system/billing-system.module';
import { Member1WhatsappModule } from './member1/member1-whatsapp/member1-whatsapp.module';
import { User1Component } from './member5/user1/user1.component';
import { User2Component } from './member5/user2/user2.component';
import { ChatWindowComponent } from './member5/chat-window/chat-window.component';

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

    // ✅ Gaming PC Builder Components — Rohan Nayak (24BCSG13)
    GamingPcBuilderComponent,
    ProductCatalogComponent,
    CustomerDetailsComponent,
    BillSummaryComponent,
    CategoryFilterComponent,
    NotificationPanelComponent,
    SavedBillsComponent,
    User1Component,
    User2Component,
    ChatWindowComponent,
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

