import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrpAComponent } from './grp-a/grp-a.component';

import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';

import { GrpARoutingModule } from './grp-a-routing.module';

import { BillingSystemModule } from './member9/billing-system/billing-system.module';
import { ProductManagementComponent } from './member9/product-management/product-management.component';
import { AttendanceComponent } from './member9/attendance/attendance.component';

// ── ANGULAR MATERIAL IMPORTS FOR YOUR ATTENDANCE MATRIX ──────────────────
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; // <-- ADDED THIS
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    GrpAComponent,
    Member1Component,
    Member2Component,
    Member3Component,
    Member4Component,
    Member5Component,
    Member6Component,
    Member7Component,
    Member8Component,
    Member9Component,
    ProductManagementComponent,
    AttendanceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GrpARoutingModule,
    BillingSystemModule,

    MatTableModule,
    MatTreeModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule, // <-- ADDED THIS
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class GrpAModule {}
