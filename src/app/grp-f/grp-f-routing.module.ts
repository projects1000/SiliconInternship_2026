import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrpFComponent } from './grp-f/grp-f.component';

import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member6AttendanceComponent } from './member6-attendance/member6-attendance.component';
import { Member6ChatComponent } from './member6-chat/member6-chat.component';

import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
import { Member10Component } from './member10/member10.component';

const routes: Routes = [
  {
    path: '',
    component: GrpFComponent
  },
  {
    path: 'member1',
    component: Member1Component
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
    path: 'member6-chat',
    component: Member6ChatComponent
  },
{
  path: 'member6-attendance',
  component: Member6AttendanceComponent
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
    path: 'member10',
    component: Member10Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrpFRoutingModule {}