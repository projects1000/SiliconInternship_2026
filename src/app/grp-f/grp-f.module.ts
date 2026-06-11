import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
import { GrpFRoutingModule } from './grp-f-routing.module';
import { DashboardComponent } from './member9/dashboard/dashboard.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";



@NgModule({
  declarations: [
    GrpFComponent,
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
    DashboardComponent
  ],
  imports: [
    CommonModule,
    GrpFRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule
]
})
export class GrpFModule { }
