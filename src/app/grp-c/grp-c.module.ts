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

import { GrpCRoutingModule } from './grp-c-routing.module';

import { AttendanceDashboardComponent } from './member2/attendance-dashboard/attendance-dashboard.component';

import { ShoppingDashboardComponent } from './member2/shopping-dashboard/shopping-dashboard.component';
import { AnimeCollectionComponent } from './member2/anime-collection/anime-collection.component';
import { CustomerManagementComponent } from './member2/customer-management/customer-management.component';
import { InvoiceManagementComponent } from './member2/invoice-management/invoice-management.component';
import { ToastNotificationComponent } from './member2/toast-notification/toast-notification.component';
import { WhatsappChatComponent } from './member2/whatsapp-chat/whatsapp-chat.component';
import { UserAComponent } from './member2/user-a/user-a.component';
import { UserBComponent } from './member2/user-b/user-b.component';
import { MessagingPanelComponent } from './member2/messaging-panel/messaging-panel.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';



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
    AnimeCollectionComponent,
    CustomerManagementComponent,
    InvoiceManagementComponent,
    ToastNotificationComponent,
    WhatsappChatComponent,
    UserAComponent,
    UserBComponent,
    MessagingPanelComponent
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
