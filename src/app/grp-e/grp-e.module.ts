import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { SubhalaxmiAttendanceComponent } from './member9/subhalaxmi-attendance/subhalaxmi-attendance.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BookDashboardComponent } from './member9/book-store/book-dashboard/book-dashboard.component';
import { BookListComponent } from './member9/book-store/book-list/book-list.component';
import { CustomerDetailsComponent } from './member9/book-store/customer-details/customer-details.component';
import { BookBillComponent } from './member9/book-store/book-bill/book-bill.component';
import { NotificationComponent } from './member9/book-store/notification/notification.component';

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
    SubhalaxmiAttendanceComponent,
    BookDashboardComponent,
    BookListComponent,
    CustomerDetailsComponent,
    BookBillComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    GrpERoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class GrpEModule { }
