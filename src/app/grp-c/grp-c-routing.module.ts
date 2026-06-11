import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrpCComponent } from './grp-c/grp-c.component';

import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
import { Member10Component } from './member10/member10.component';
import('./member1/member1.module').then(m => m.Member1Module)

import { Member4attmngComponent } from './member4/member4attmng/member4attmng.component';
import { ProductManagementComponent } from './member9/product-management/product-management.component';
import { Member3AttendanceComponent } from './member3/member3-attendance/member3-attendance.component';


import { AttendanceComponent } from './member9/attendance/attendance.component';

const routes: Routes = [
  {
    path: '',
    component: GrpCComponent
  },
  {
    path: 'member1',
    loadChildren: () =>
      import('./member1/member1.module').then(m => m.Member1Module)
  },
  {
    path: 'member2',
    component: Member2Component
  },
  {
    path: 'member3',
    component: Member3Component
  },
  {
    path: 'member4',
    component: Member4Component
  },
  {
    path: 'member5',
    component: Member5Component
  },
  {
    path: 'member6',
    component: Member6Component
  },
  {
    path: 'member7',
    component: Member7Component
  },
  {
    path: 'member8',
    component: Member8Component
  },
  {
    path: 'member9',
    component: Member9Component
  },

  {
    path: 'attendance',
    component: AttendanceComponent
  },
  path: 'member9',
  component: Member9Component
},
{
  path: 'product-management',
  component: ProductManagementComponent
},
{
  path: 'member10',
  component: Member10Component
},

  {
  path: 'member4/member4attmng',
  component: Member4attmngComponent
},

  { path: 'member3-attendance', component: Member3AttendanceComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrpCRoutingModule { }