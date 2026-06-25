import { NgModule } from '@angular/core';
// src/app/grp-f/grp-f.module.ts

import { NgModule } from '@angular/core';
 nirmit-member9-update
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GrpFRoutingModule } from './grp-f-routing.module';
 main

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule, MatCommonModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GrpFRoutingModule } from './grp-f-routing.module';
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
import { BillingComponent as Member3BillingComponent } from './member3/billing-system/billing.component';
import { Member6AttendanceComponent } from './member6-attendance/member6-attendance.component';
import { Member6ChatComponent } from './member6-chat/member6-chat.component';
import { Member10AttendanceDashboardComponent } from './member10/member10-attendance-dashboard/member10-attendance-dashboard.component';
import { BillingComponent as Member10BillingComponent } from './member10/billing/billing.component';
import { AttendanceComponent } from './member5/attendance/attendance.component';
import { Member4AttendanceComponent} from './member4/attendance/attendance.component';
import { ProductManagementComponent } from './member4/product-management/product-management.component';
import { ProductListComponent } from './member4/product-list/product-list.component';

import { BillingComponent } from './member4/billing/billing.component';
import { NotificationComponent } from './member4/notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import{ProductDetailComponent} from './member4/product-detail/product-detail.component';
import { FooterComponent } from './member4/footer/footer.component';
import { LoginComponent } from './member4/login/login.component';
import { ToastService } from './member4/shared/toast.service';
import { ProductService } from './member4/shared/product.service';
import { CartComponent } from './member4/cart/cart.component';
import { CheckoutComponent } from './member4/checkout/checkout.component';
import { StudentAComponent } from './member4/student-a/student-a.component';
import { StudentBComponent } from './member4/student-b/student-b.component';
import { ChatWindowComponent } from './member4/chat-window/chat-window.component';
import { ChatService } from './member4/chat-service/chat.service';
import { CustomerService } from './member4/shared/customer.service';

import { BillingComponent } from './member10/billing/billing.component';
import { Member10AttendanceDashboardComponent } from './member10/member10-attendance-dashboard/member10-attendance-dashboard.component';
import { Member6AttendanceComponent } from './member6-attendance/member6-attendance.component';
import { Member6ChatComponent } from './member6-chat/member6-chat.component';
import { AttendanceComponent } from './member5/attendance/attendance.component';


// ── New Chat App components ──
import { Member10ChatAppComponent } from './member10/member10-chatapp/member10-chatapp.component';
import { Member10UserAComponent } from './member10/member10-chatapp/user-a/user-a.component';
import { Member10UserBComponent } from './member10/member10-chatapp/user-b/user-b.component';
import { Member10ChatWindowComponent } from './member10/member10-chatapp/chat-window/chat-window.component';

import { GrpFRoutingModule } from './grp-f-routing.module';
import { DashboardComponent } from './member9/dashboard/dashboard.component';
import { GroceryBillingComponent } from './member9/grocery-billing/grocery-billing.component';
import { ProductListComponent } from './member9/grocery-billing/product-list/product-list.component';
import { CustomerDetailsComponent } from './member9/grocery-billing/customer-details/customer-details.component';
import { BillDetailsComponent } from './member9/grocery-billing/bill-details/bill-details.component';
import { NotificationsComponent } from './member9/grocery-billing/notifications/notifications.component';



@NgModule({
  declarations: [
    GrpFComponent,

    Member1Component,
    Member2Component,
    Member3Component,
    Member4Component,
    Member4AttendanceComponent,
    Member5Component,
    AttendanceComponent,
    Member6Component,
    Member7Component,
    Member8Component,
    Member9Component,
    DashboardComponent,
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
    Member10AttendanceDashboardComponent,
 nirmit-member9-update
    GroceryBillingComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    NotificationsComponent,
    
  ],
  imports: [
  CommonModule,
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
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatRippleModule
]})
export class GrpFModule { }

    Member3BillingComponent,
    Member10BillingComponent
    ProductManagementComponent,
    ProductListComponent,
 
    BillingComponent,
    NotificationComponent,
   ProductDetailComponent,
    FooterComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent
   
    
  ],
  providers: [
    ToastService,
    ProductService,
    ChatService,
     CustomerService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GrpFRoutingModule,
MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatTreeModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatRippleModule
    MatInputModule,
    ChatWindowComponent,
       StudentAComponent,      
    StudentBComponent,      
    ChatWindowComponent
  ],
   exports: [
    ChatWindowComponent,
    StudentAComponent,
  StudentBComponent
  ]

})
export class GrpFModule { }
export class GrpFModule {}
 main
