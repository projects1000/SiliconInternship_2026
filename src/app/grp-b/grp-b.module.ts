import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrpBComponent } from './grp-b/grp-b.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { AttendanceComponent } from './member3/attendance/attendance.component';
import { Member3MaterialModule } from './member3/member3-material.module';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { GrpBRoutingModule } from './grp-b-routing.module';



@NgModule({
  declarations: [
    GrpBComponent,
    Member1Component,
    Member2Component,
    Member3Component,
    AttendanceComponent,
    Member4Component,
    Member5Component,
    Member6Component
  ],
  imports: [
    CommonModule,
    GrpBRoutingModule,
    Member3MaterialModule
  ]
})
export class GrpBModule { }
