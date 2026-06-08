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
import { AttendanceComponent } from './member1/attendance/attendance.component';
import { AttandanceComponent } from './member7/attandance/attandance.component';



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
    
  ],
  imports: [
    CommonModule,
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
    AttendanceComponent
  ]
})
export class GrpEModule { }
