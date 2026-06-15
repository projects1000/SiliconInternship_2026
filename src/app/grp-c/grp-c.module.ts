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
import { UserAComponent as Member9UserAComponent } from './member9/user-a/user-a.component';
import { UserBComponent as Member9UserBComponent } from './member9/user-b/user-b.component';
import { ChatWindowComponent as Member9ChatWindowComponent } from './member9/chat-window/chat-window.component';

import { ChatbotComponent } from './member9/chatbot/chatbot.component';
import { BillingParentComponent } from './member3/billing-parent/billing-parent.component';
import { ProductListComponent } from './member3/billing-parent/product-list/product-list.component';
import { CustomerDetailsComponent } from './member3/billing-parent/customer-details/customer-details.component';
import { BillDetailsComponent } from './member3/billing-parent/bill-details/bill-details.component';
import { NotificationComponent } from './member3/billing-parent/notification/notification.component';
import { ChatParentComponent } from './member3/chat-system/chat-parent/chat-parent.component';
import { UserAyushComponent } from './member3/chat-system/user-ayush/user-ayush.component';
import { UserAnshumanComponent } from './member3/chat-system/user-anshuman/user-anshuman.component';
import { ChatWindowComponent as Member3ChatWindowComponent } from './member3/chat-system/chat-window/chat-window.component';
import { Member8AttendanceComponent } from './member8-attendance/member8-attendance.component';
<<<<<<< HEAD

=======
>>>>>>> main
import { Member8ChatParentComponent } from './member8/chat-system/chat-parent/chat-parent.component';
import { Member8UserAComponent } from './member8/chat-system/user-a/user-a.component';
import { Member8UserBComponent } from './member8/chat-system/user-b/user-b.component';
import { Member8ChatWindowComponent } from './member8/chat-system/chat-window/chat-window.component';

import { AttendanceDashboardComponent } from './member2/attendance-dashboard/attendance-dashboard.component';

import { ShoppingDashboardComponent } from './member2/shopping-dashboard/shopping-dashboard.component';
import { AnimeCollectionComponent } from './member2/anime-collection/anime-collection.component';
import { CustomerManagementComponent } from './member2/customer-management/customer-management.component';
import { InvoiceManagementComponent } from './member2/invoice-management/invoice-management.component';
import { ToastNotificationComponent } from './member2/toast-notification/toast-notification.component';
import { WhatsappChatComponent } from './member2/whatsapp-chat/whatsapp-chat.component';
import { UserAComponent as Member2UserAComponent } from './member2/user-a/user-a.component';
import { UserBComponent as Member2UserBComponent } from './member2/user-b/user-b.component';
import { MessagingPanelComponent } from './member2/messaging-panel/messaging-panel.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';

import { BillingSystemMember4Module } from './member4/billingsystem-member4/billing-system-member4.module';

<<<<<<< HEAD
=======


>>>>>>> main
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

    // Member 2 Components
    AttendanceDashboardComponent,
    ShoppingDashboardComponent,
    AnimeCollectionComponent,
    CustomerManagementComponent,
    InvoiceManagementComponent,
    ToastNotificationComponent,
    WhatsappChatComponent,
    Member2UserAComponent,
    Member2UserBComponent,
    MessagingPanelComponent,

    // Member 3 Components
    Member3AttendanceComponent,
<<<<<<< HEAD
=======
    ProductManagementComponent,
    Member9UserAComponent,
    Member9UserBComponent,
    Member9ChatWindowComponent,
    ChatbotComponent,
>>>>>>> main
    BillingParentComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    NotificationComponent,
    ChatParentComponent,
    UserAyushComponent,
    UserAnshumanComponent,
<<<<<<< HEAD
    Member3ChatWindowComponent,

    // Member 4 Components
    Member4attmngComponent,

    // Member 8 Components
    Member8AttendanceComponent,
    Member8ChatParentComponent,
    Member8UserAComponent,
    Member8UserBComponent,
    Member8ChatWindowComponent,

    // Member 9 Components
    AttendanceComponent,
    ProductManagementComponent,
    Member9UserAComponent,
    Member9UserBComponent,
    Member9ChatWindowComponent,
    ChatbotComponent,
  ],
=======
    ChatWindowComponent,
],
>>>>>>> main
  imports: [
    CommonModule,
    GrpCRoutingModule,
    FormsModule,

    MatTreeModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,

    BillingSystemMember4Module,
    ProductManagementModule,
  ],
})
export class GrpCModule {}
