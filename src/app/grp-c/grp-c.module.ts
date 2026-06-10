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

import { Member4attmngComponent } from './member4/member4attmng/member4attmng.component';

import { Member3AttendanceComponent } from './member3/member3-attendance/member3-attendance.component';




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

    Member4attmngComponent,

    Member3AttendanceComponent

  ],
  imports: [
    CommonModule,
    GrpCRoutingModule,
    FormsModule
  ]
})
export class GrpCModule { }
