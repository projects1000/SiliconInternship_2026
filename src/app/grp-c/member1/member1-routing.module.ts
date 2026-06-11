import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Member1Component } from './member1.component';

const routes: Routes = [
  {
    path: '',
    component: Member1Component
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.module').then(
        m => m.AttendanceModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Member1RoutingModule { }