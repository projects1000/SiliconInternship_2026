import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrpFRoutingModule } from './grp-f-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

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
import { Member4AttendanceComponent} from './member4/attendance/attendance.component';
import { ProductManagementComponent } from './member4/product-management/product-management.component';
import { ProductListComponent } from './member4/product-list/product-list.component';
import { CustomerComponent } from './member4/customer/customer.component';
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
    Member10Component,
    ProductManagementComponent,
    ProductListComponent,
    CustomerComponent,
    BillingComponent,
    NotificationComponent,
   ProductDetailComponent,
    FooterComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,
    StudentAComponent,
    StudentBComponent,
    ChatWindowComponent
  ],
  providers: [
    ToastService,
    ProductService
  ],
  imports: [
    CommonModule,
    GrpFRoutingModule,
    FormsModule,
MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatTreeModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class GrpFModule { }