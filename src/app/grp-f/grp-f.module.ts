import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
<<<<<<< HEAD
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { GrpFRoutingModule } from './grp-f-routing.module';
=======
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
>>>>>>> b84a771ebef0a3c2c011496eb1cceb62a05c5705

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

import { AttendanceComponent } from './member5/attendance/attendance.component';

import { AttendanceProjectComponent } from './member3/attendance-project/attendance-project.component';
import { HeaderComponent } from './member3/attendance-project/header/header.component';
import { TeamTreeComponent } from './member3/attendance-project/team-tree/team-tree.component';
import { AttendanceTableComponent } from './member3/attendance-project/attendance-table/attendance-table.component';
import { SummaryCardsComponent } from './member3/attendance-project/summary-cards/summary-cards.component';
import { ReportsComponent } from './member3/attendance-project/reports/reports.component';

import { WhatsappChatComponent } from './member3/whatsapp-chat/whatsapp-chat.component';
import { UserAComponent } from './member3/user-a/user-a.component';
import { UserBComponent } from './member3/user-b/user-b.component';
import { ChatWindowComponent } from './member3/chat-window/chat-window.component';

import { BillingSystemComponent } from './member3/billing-system/billing-system.component';
import { ProductListComponent } from './member3/product-list/product-list.component';
import { CustomerComponent } from './member3/customer/customer.component';
import { BillingComponent } from './member3/billing/billing.component';
import { Member6AttendanceComponent } from './member6-attendance/member6-attendance.component';
import { Member6ChatComponent } from './member6-chat/member6-chat.component';
import { AttendanceComponent } from './member5/attendance/attendance.component';
import { Member10AttendanceDashboardComponent } from './member10/member10-attendance-dashboard/member10-attendance-dashboard.component';
import { BillingComponent } from './member10/billing/billing.component';
import { GrpFRoutingModule } from './grp-f-routing.module';

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

    AttendanceComponent,

    AttendanceProjectComponent,
    HeaderComponent,
    TeamTreeComponent,
    AttendanceTableComponent,
    SummaryCardsComponent,
    ReportsComponent,

    WhatsappChatComponent,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent,

    BillingSystemComponent,
    ProductListComponent,
    CustomerComponent,
    Member6AttendanceComponent,
    Member6ChatComponent,
    AttendanceComponent,
    Member10AttendanceDashboardComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GrpFRoutingModule,

    GrpFRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatTreeModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatRippleModule
  ]
})
export class GrpFModule { }