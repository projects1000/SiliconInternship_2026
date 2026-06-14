import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { GrpEComponent } from './grp-e/grp-e.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
import { GrpERoutingModule } from './grp-e-routing.module';
import { AttendanceComponent as Member1AttendanceComponent }
from './member1/attendance/attendance.component';
import { AttandanceComponent } from './member7/attandance/attandance.component';
import { NavbarComponent } from './member8/navbar/navbar.component';
import { HomeComponent } from './member8/home/home.component';
import { ServicesComponent } from './member8/services/services.component';
import { ProjectsComponent } from './member8/projects/projects.component';
import { AttendanceComponent as Member8AttendanceComponent }
from './member8/attendance/attendance.component';
import { BillingHomeComponent } from './member8/billing/billing-home/billing-home.component';
import { CustomerDetailsComponent } from './member8/billing/customer-details/customer-details.component';
import { ProductListComponent } from './member8/billing/product-list/product-list.component';
import { NotificationComponent } from './member8/billing/notification/notification.component';
import { BillingCartComponent } from './member8/billing/billing-cart/billing-cart.component';
import { AttendanceComponent0001 } from './member2/attendence0001/attendence0001.component';
import { NitroBillingComponent } from './member7/nitro-billing/nitro-billing.component';
import { ProductListComponent as Member7ProductListComponent } from './member7/nitro-billing/product-list/product-list.component';
import { CustomerDetailsComponent as Member7CustomerDetailsComponent } from './member7/nitro-billing/customer-details/customer-details.component';
import { BillDetailsComponent as Member7BillDetailsComponent } from './member7/nitro-billing/bill-details/bill-details.component';
import { NotificationComponent as Member7NotificationComponent } from './member7/nitro-billing/notification/notification.component';

import { ChatComponent as Member7ChatComponent } from './member7/chat/chat.component';
import { UserAComponent as Member7UserAComponent } from './member7/chat/user-a/user-a.component';
import { UserBComponent as Member7UserBComponent } from './member7/chat/user-b/user-b.component';
import { ChatWindowComponent as Member7ChatWindowComponent } from './member7/chat/chat-window/chat-window.component';
import { Billingmanagement0001Component } from './member2/billingmanagement0001/billingmanagement0001.component';
import { Whatsappclone0001Component } from './member2/whatsappclone0001/whatsappclone0001.component';






@NgModule({
  declarations: [
    GrpEComponent,
    Member1Component,
    Member2Component,
    Member3Component,
    Member4Component,
    Member5Component,
    Member6Component,
    Member7Component,
    Member8Component,
    Member9Component,

    AttandanceComponent,
    AttendanceComponent0001,

    NavbarComponent,
    HomeComponent,
    ServicesComponent,
    ProjectsComponent,
    Member8AttendanceComponent,
    BillingHomeComponent,
    CustomerDetailsComponent,
    ProductListComponent,
    NotificationComponent,
    BillingCartComponent,

    NitroBillingComponent,
    Member7ProductListComponent,
    Member7CustomerDetailsComponent,
    Member7BillDetailsComponent,
    Member7NotificationComponent,

    Member7ChatComponent,
    Member7UserAComponent,
    Member7UserBComponent,
    Member7ChatWindowComponent,
    Billingmanagement0001Component,
    Whatsappclone0001Component,

  ],

  imports: [
    CommonModule,
    RouterModule,
    GrpERoutingModule,
    FormsModule,
    MatTreeModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Member1AttendanceComponent,
  ]
})
export class GrpEModule { }
