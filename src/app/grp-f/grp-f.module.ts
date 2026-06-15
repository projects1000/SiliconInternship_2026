import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrpFComponent } from './grp-f/grp-f.component';
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
import { GrpFRoutingModule } from './grp-f-routing.module';
import { Member2AttendanceComponent } from './member2/member2-attendance/member2-attendance.component';
import { MemberTreeComponent } from './member2/member-tree/member-tree.component';
import { AttendanceTableComponent } from './member2/attendance-table/attendance-table.component';
import { FormsModule } from '@angular/forms';
import { AttendanceHistoryComponent } from './member2/attendance-history/attendance-history.component';
import { AttendanceCalendarComponent } from './member2/attendance-calendar/attendance-calendar.component';
import { ProductDashboardComponent } from './member2/product-management/product-dashboard/product-dashboard.component';
import { ProductListComponent } from './member2/product-management/product-list/product-list.component';
import { CustomerDetailsComponent } from './member2/product-management/customer-details/customer-details.component';
import { BillingComponent } from './member2/product-management/billing/billing.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WhatsappChatDashboardComponent } from './member2/whatsapp-chat/whatsapp-chat-dashboard/whatsapp-chat-dashboard.component';
import { UserAComponent } from './member2/whatsapp-chat/user-a/user-a.component';
import { UserBComponent } from './member2/whatsapp-chat/user-b/user-b.component';
import { ChatWindowComponent } from './member2/whatsapp-chat/chat-window/chat-window.component';

@NgModule({
  declarations: [
    GrpFComponent,
    Member1Component,
    Member2Component,
    Member3Component,
    Member4Component,
    Member5Component,
    Member6Component,
    Member7Component,
    Member8Component,
    Member9Component,
    Member10Component,
    Member2AttendanceComponent,
    MemberTreeComponent,
    AttendanceTableComponent,
    AttendanceHistoryComponent,
    AttendanceCalendarComponent,
    ProductDashboardComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillingComponent,
    WhatsappChatDashboardComponent,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
    GrpFRoutingModule,
    FormsModule,
    MatSnackBarModule
  ]

})
export class GrpFModule { }
