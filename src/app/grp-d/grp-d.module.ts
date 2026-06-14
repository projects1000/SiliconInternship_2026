import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { GrpDRoutingModule } from './grp-d-routing.module';

// Layout & Members
import { GrpDComponent } from './grp-d/grp-d.component';
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
import { Member11Component } from './member11/member11.component';

// Member 1 Functionality
import { AttendanceComponent } from './member1/attendance/attendance.component';
import { ProductManagementComponent as Member1Prod } from './member1/product-management/product-management.component';
import { ProductListComponent as Member1List } from './member1/product-list/product-list.component';
import { CustomerDetailsComponent } from './member1/customer-details/customer-details.component';
import { BillDetailsComponent } from './member1/bill-details/bill-details.component';
import { UserAComponent } from './member1/user-a/user-a.component';
import { UserBComponent } from './member1/user-b/user-b.component';
import { ChatWindowComponent as Member1Chat } from './member1/chat-window/chat-window.component';

// Member 3 Functionality
import { AttendanceTrackerComponent } from './member3/attendance-tracker/attendance-tracker.component';
import { ProductManagementComponent as Member3Prod } from './member3/product-management/product-management.component';
import { ProductLisComponent as Member3List } from './member3/product-lis/product-lis.component';
import { ProductFormComponent } from './member3/product-form/product-form.component';
import { BillingComponent } from './member3/billing/billing.component';
import { ChatWindowComponent as Member3Chat } from './member3/chat-window/chat-window.component';



// Routing & Material Modules

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AboutComponent } from './member5/about/about.component';
import { NavbarComponent } from './member5/navbar/navbar.component';
import { HomeComponent } from './member5/home/home.component';
import { HeroComponent } from './member5/hero/hero.component';
import { ProfileComponent } from './member5/profile/profile.component';
import { AttendanceSComponent } from './member5/attendance-s/attendance-s.component';
import { BillingdashboardComponent } from './member5/billingdashboard/billingdashboard.component';
import { WhatsappComponent } from './member5/whatsapp/whatsapp.component';
import { TrackattendanceComponent } from './member6/trackattendance/trackattendance.component';
import { M6ShopShellComponent } from './member6/m6-shop-shell/m6-shop-shell.component';
import { M6ShopBillDeskComponent } from './member6/m6-shop-bill-desk/m6-shop-bill-desk.component';
import { M6ShopCustomerCaptureComponent } from './member6/m6-shop-customer-capture/m6-shop-customer-capture.component';
import { M6ShopProductFeedComponent } from './member6/m6-shop-product-feed/m6-shop-product-feed.component';
import { Friend1Component } from './member6/chatting/friend1/friend1.component';
import { Friend2Component } from './member6/chatting/friend2/friend2.component';
import { DisplaywindowComponent } from './member6/chatting/displaywindow/displaywindow.component';


@NgModule({
  declarations: [
    GrpDComponent,
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
    Member11Component,
    AttendanceComponent,
    Member1Prod,
    Member1List,
    CustomerDetailsComponent,
    BillDetailsComponent,

    AboutComponent,
    NavbarComponent,
    HomeComponent,
    HeroComponent,
    ProfileComponent,
    AttendanceSComponent,
    BillingdashboardComponent,
    WhatsappComponent,
    UserAComponent,
    UserBComponent,
    Member1Chat,
    AttendanceTrackerComponent,
    Member3Prod,
    Member3List,
    ProductFormComponent,
    BillingComponent,
    Member3Chat,
    TrackattendanceComponent,
    M6ShopShellComponent,
    M6ShopBillDeskComponent,
    M6ShopCustomerCaptureComponent,
    M6ShopProductFeedComponent,
    Friend1Component,
    Friend2Component,
    DisplaywindowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GrpDRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTreeModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GrpDModule { }