import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ── Material Modules ──
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MatRippleModule,
  MatCommonModule,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// ── Base Group Component & Routing ──
import { GrpFComponent } from './grp-f/grp-f.component';
import { GrpFRoutingModule } from './grp-f-routing.module';

// ── Main Member Components ──
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member2AttendanceComponent } from './member2/member2-attendance/member2-attendance.component';
import { AttendanceHistoryComponent } from './member2/attendance-history/attendance-history.component';
import { MemberTreeComponent } from './member2/member-tree/member-tree.component';
import { AttendanceTableComponent as Member2AttendanceTableComponent } from './member2/attendance-table/attendance-table.component';
import { AttendanceCalendarComponent as Member2AttendanceCalendarComponent } from './member2/attendance-calendar/attendance-calendar.component';
import { ProductDashboardComponent } from './member2/product-management/product-dashboard/product-dashboard.component';
import { ProductListComponent as Member2ProductListComponent } from './member2/product-management/product-list/product-list.component';
import { CustomerDetailsComponent } from './member2/product-management/customer-details/customer-details.component';
import { BillingComponent as Member2BillingComponent } from './member2/product-management/billing/billing.component';
import { UserAComponent as Member2UserAComponent } from './member2/whatsapp-chat/user-a/user-a.component';
import { ChatWindowComponent as Member2ChatWindowComponent } from './member2/whatsapp-chat/chat-window/chat-window.component';
import { UserBComponent as Member2UserBComponent } from './member2/whatsapp-chat/user-b/user-b.component';
import { WhatsappChatDashboardComponent } from './member2/whatsapp-chat/whatsapp-chat-dashboard/whatsapp-chat-dashboard.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
import { Member10Component } from './member10/member10.component';

// ── Member 3 Subcomponents ──
import { AttendanceProjectComponent } from './member3/attendance-project/attendance-project.component';
import { HeaderComponent } from './member3/attendance-project/header/header.component';
import { TeamTreeComponent } from './member3/attendance-project/team-tree/team-tree.component';
import { AttendanceTableComponent } from './member3/attendance-project/attendance-table/attendance-table.component';
import { SummaryCardsComponent } from './member3/attendance-project/summary-cards/summary-cards.component';
import { ReportsComponent } from './member3/attendance-project/reports/reports.component';
import { WhatsappChatComponent } from './member3/whatsapp-chat/whatsapp-chat.component';
import { UserAComponent } from './member3/user-a/user-a.component';
import { UserBComponent } from './member3/user-b/user-b.component';
import { ChatWindowComponent as Member3ChatWindowComponent } from './member3/chat-window/chat-window.component';
import { BillingSystemComponent as Member3BillingSystemComponent } from './member3/billing-system/billing-system.component';
import { BillingComponent as Member3BillingComponent } from './member3/billing/billing.component';
import { ProductListComponent as Member3ProductListComponent } from './member3/product-list/product-list.component';
import { CustomerComponent } from './member3/customer/customer.component';

// ── Member 4 Subcomponents & Services ──
import { Member4AttendanceComponent } from './member4/attendance/attendance.component';
import { ProductManagementComponent } from './member4/product-management/product-management.component';
import { ProductListComponent as Member4ProductListComponent } from './member4/product-list/product-list.component';
import { BillingComponent as Member4BillingComponent } from './member4/billing/billing.component';
import { NotificationComponent } from './member4/notification/notification.component';
import { ProductDetailComponent } from './member4/product-detail/product-detail.component';
import { FooterComponent } from './member4/footer/footer.component';
import { LoginComponent } from './member4/login/login.component';
import { CartComponent } from './member4/cart/cart.component';
import { CheckoutComponent } from './member4/checkout/checkout.component';
import { StudentAComponent } from './member4/student-a/student-a.component';
import { StudentBComponent } from './member4/student-b/student-b.component';
import { ChatWindowComponent as Member4ChatWindowComponent } from './member4/chat-window/chat-window.component';
import { ToastService } from './member4/shared/toast.service';
import { ProductService } from './member4/shared/product.service';
import { ChatService } from './member4/chat-service/chat.service';
import { CustomerService } from './member4/shared/customer.service';

// ── Member 5 Subcomponents ──
import { AttendanceComponent as Member5AttendanceComponent } from './member5/attendance/attendance.component';

// ── Member 7 Subcomponents ──
import { AttendanceComponent as Member7AttendanceComponent } from './member7/attendance/attendance.component';
import { ChatComponent as Member7ChatComponent } from './member7/chat/chat.component';

// ── Member 6 Subcomponents ──
import { Member6AttendanceComponent } from './member6-attendance/member6-attendance.component';
import { Member6ChatComponent } from './member6-chat/member6-chat.component';

// ── Member 10 Subcomponents ──
import { Member10AttendanceDashboardComponent } from './member10/member10-attendance-dashboard/member10-attendance-dashboard.component';
import { BillingComponent as Member10BillingComponent } from './member10/billing/billing.component';
import { Member10ChatAppComponent } from './member10/member10-chatapp/member10-chatapp.component';
import { Member10UserAComponent } from './member10/member10-chatapp/user-a/user-a.component';
import { Member10UserBComponent } from './member10/member10-chatapp/user-b/user-b.component';
import { Member10ChatWindowComponent } from './member10/member10-chatapp/chat-window/chat-window.component';

@NgModule({
  declarations: [
    GrpFComponent,

    // Main Members
    Member1Component,
    Member2Component,
    Member2AttendanceComponent,
    AttendanceHistoryComponent,
    MemberTreeComponent,
    Member2AttendanceTableComponent,
    Member2AttendanceCalendarComponent,
    ProductDashboardComponent,
    Member2ProductListComponent,
    CustomerDetailsComponent,
    Member2BillingComponent,
    Member2UserAComponent,
    Member2ChatWindowComponent,
    Member2UserBComponent,
    WhatsappChatDashboardComponent,
    Member3Component,
    Member4Component,
    Member5Component,
    Member6Component,
    Member7Component,
    Member8Component,
    Member9Component,
    Member10Component,

    // Member 3 features
    AttendanceProjectComponent,
    HeaderComponent,
    TeamTreeComponent,
    AttendanceTableComponent,
    SummaryCardsComponent,
    ReportsComponent,
    WhatsappChatComponent,
    UserAComponent,
    UserBComponent,
    Member3BillingSystemComponent,
    Member3BillingComponent,
    Member3ProductListComponent,
    CustomerComponent,

    // Member 4 features
    Member4AttendanceComponent,
    ProductManagementComponent,
    Member4ProductListComponent,
    Member4BillingComponent,
    NotificationComponent,
    ProductDetailComponent,
    FooterComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,

    // Member 5 features
    Member5AttendanceComponent,

    // Member 7 features
    Member7AttendanceComponent,
    Member7ChatComponent,

    // Member 6 features
    Member6AttendanceComponent,
    Member6ChatComponent,

    // Member 10 features
    Member10AttendanceDashboardComponent,
    Member10BillingComponent,
    Member10ChatAppComponent,
    Member10UserAComponent,
    Member10UserBComponent,
    Member10ChatWindowComponent,

    // Traditional Chat/Student Components belong here
    Member3ChatWindowComponent,
  ],
  providers: [ToastService, ProductService, ChatService, CustomerService],
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
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatRippleModule,
    MatInputModule,
  ],
  exports: [
    Member3ChatWindowComponent,
  ],
})
export class GrpFModule {}
