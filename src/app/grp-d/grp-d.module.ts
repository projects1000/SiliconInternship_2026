import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { GrpDRoutingModule } from './grp-d-routing.module';

// Angular Material Imports (CRITICAL FOR CALENDAR)
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Components
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
import { AttendanceMatrixComponent } from './member3/attendance-matrix/attendance-matrix.component';

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
    AttendanceMatrixComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GrpDRoutingModule,
    // Add these to imports:
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class GrpDModule { }