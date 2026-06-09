import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrpBComponent } from './grp-b/grp-b.component';
import { AttendanceComponent as Member3AttendanceComponent } from './member3/attendance/attendance.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member1AttendanceComponent } from './member1/attendance/attendance.component';
import { AttendanceComponent as Member2AttendanceComponent } from './member2/attendance/attendance.component';
import { Member5AttendanceComponent } from './member5/attendance/attendance.component';
const routes: Routes = [
  {
    path: '',
    component: GrpBComponent,
  },
  // {
  //   path: 'member1',
  //   component: Member1Component,
  //   children: [
  //     {
  //       path: 'attendance',
  //       component: Member1AttendanceComponent
  //     }
  //   ]
  // },
  {
    path: 'member2/attendance',
    component: Member2AttendanceComponent
  }
  ,
  {
    path: 'member1',
    component: Member1Component,
  },
  {
    path: 'member1/attendance',
    component: Member1AttendanceComponent,
  },
  {
    path: 'member2',
    component: Member2Component,
  },
  {
    path: 'member3',
    component: Member3Component,
  },
  {
    path: 'member3/attendance',
    component: Member3AttendanceComponent
  },
  {
    path: 'member4',
    component: Member4Component,
  },
  {
    path: 'member5',
    component: Member5Component,
  },
  {
    path: 'member5/attendance',
    component: Member5AttendanceComponent,
  },
  {
    path: 'member6',
    component: Member6Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrpBRoutingModule { }