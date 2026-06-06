import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    Member9Component
  ],
  imports: [
    CommonModule,
    GrpARoutingModule
  ]
})
export class GrpAModule { }