import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { GrpCRoutingModule } from './grp-c-routing.module';

import { AttendanceDashboardComponent } from './member2/attendance-dashboard/attendance-dashboard.component';

import { FormsModule } from '@angular/forms';

import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { ShoppingDashboardComponent } from './member2/shopping-dashboard/shopping-dashboard.component';
import { ProductListComponent } from './member2/product-list/product-list.component';
import { CustomerDetailsComponent } from './member2/customer-details/customer-details.component';
import { BillDetailsComponent } from './member2/bill-details/bill-details.component';
import { NotificationComponent } from './member2/notification/notification.component';
import { WhatsappChatComponent } from './member2/whatsapp-chat/whatsapp-chat.component';
import { UserAComponent } from './member2/user-a/user-a.component';
import { UserBComponent } from './member2/user-b/user-b.component';
import { ChatWindowComponent } from './member2/chat-window/chat-window.component';



@NgModule({
  declarations: [
    GrpCComponent,
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
    AttendanceDashboardComponent,
    ShoppingDashboardComponent,
    ProductListComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    NotificationComponent,
    WhatsappChatComponent,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent
  ],
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
    MatCardModule
  ]
})
export class GrpCModule { }
