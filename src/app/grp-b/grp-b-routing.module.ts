import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrpBComponent } from './grp-b/grp-b.component';

import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';

import { Member1AttendanceComponent } from './member1/attendance/attendance.component';

import { AttendanceComponent } from './member2/attendance/attendance.component';

import { Memb6AttendanceComponent } from './member6/memb6-attendance/memb6-attendance.component';

const routes: Routes = [

  {
    path: '',
    component: GrpBComponent,
  },

  // MEMBER 2 ATTENDANCE

  {
    path: 'member2/attendance',
    component: AttendanceComponent
  },

  // MEMBER 1

  {
    path: 'member1',
    component: Member1Component,
  },

  {
    path: 'member1/attendance',
    component: Member1AttendanceComponent,
  },

  // MEMBER 2

  {
    path: 'member2',
    component: Member2Component,
  },

  // MEMBER 3

  {
    path: 'member3',
    component: Member3Component,
  },

  // MEMBER 4

  {
    path: 'member4',
    component: Member4Component,
  },

  // MEMBER 5

  {
    path: 'member5',
    component: Member5Component,
  },

  // MEMBER 6

  {
    path: 'member6',
    component: Member6Component,
  },

  // MEMBER 6 ATTENDANCE

  {
    path: 'member6/attendance',
    component: Memb6AttendanceComponent,
  }

];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]

})

export class GrpBRoutingModule { }