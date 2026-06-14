import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrpCComponent } from './grp-c/grp-c.component';

import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
import { Member10Component } from './member10/member10.component';
import { Member4attmngComponent } from './member4/member4attmng/member4attmng.component';
import { Member3AttendanceComponent } from './member3/member3-attendance/member3-attendance.component';
import { ProductManagementModule } from './member8/product-management/product-management.module';

import { GrpCRoutingModule } from './grp-c-routing.module';
import { AttendanceComponent } from './member9/attendance/attendance.component';
import { ProductManagementComponent } from './member9/product-management/product-management.component';
import { BillingParentComponent } from './member3/billing-parent/billing-parent.component';
import { ProductListComponent } from './member3/billing-parent/product-list/product-list.component';
import { CustomerDetailsComponent } from './member3/billing-parent/customer-details/customer-details.component';
import { BillDetailsComponent } from './member3/billing-parent/bill-details/bill-details.component';
import { NotificationComponent } from './member3/billing-parent/notification/notification.component';
import { ChatParentComponent } from './member3/chat-system/chat-parent/chat-parent.component';
import { UserAyushComponent } from './member3/chat-system/user-ayush/user-ayush.component';
import { UserAnshumanComponent } from './member3/chat-system/user-anshuman/user-anshuman.component';
import { ChatWindowComponent } from './member3/chat-system/chat-window/chat-window.component';
import { Member8AttendanceComponent } from './member8-attendance/member8-attendance.component';

import { BillingSystemMember4Module } from './member4/billingsystem-member4/billing-system-member4.module';


@NgModule({
  declarations: [
    GrpCComponent,
    Member2Component,
    Member3Component,
    Member4Component,
    Member5Component,
    Member6Component,
    Member7Component,
    Member8Component,
    Member9Component,
    Member10Component,
    Member8AttendanceComponent,
    AttendanceComponent,
    Member4attmngComponent,
    Member3AttendanceComponent,
    ProductManagementComponent,
    BillingParentComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    NotificationComponent,
    ChatParentComponent,
    UserAyushComponent,
    UserAnshumanComponent,
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
    GrpCRoutingModule,
    FormsModule,

    BillingSystemMember4Module,

    ProductManagementModule
  ]
})
export class GrpCModule { }