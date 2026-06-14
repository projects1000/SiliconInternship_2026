import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrpEComponent } from './grp-e/grp-e.component';

import { Member1Component } from './member1/member1.component';
import { AttendanceComponent } from './member1/attendance/attendance.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member7Component } from './member7/member7.component';
import { AttandanceComponent } from './member7/attandance/attandance.component';
import { AttendanceComponent0001 } from './member2/attendence0001/attendence0001.component';
import { Billingmanagement0001Component } from './member2/billingmanagement0001/billingmanagement0001.component';
import { NitroBillingComponent } from './member7/nitro-billing/nitro-billing.component';
import { ChatComponent as Member7ChatComponent } from './member7/chat/chat.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
const routes: Routes = [
  {
    path: '',
    component: GrpEComponent,
  },
  {
    path: 'member1',
    component: Member1Component,
  },
  {
    path: 'member1/attendance',
    component: AttendanceComponent,
  },
  {
    path: 'member2',
    component: Member2Component,
  },
  {
    path: 'member2/attendence0001',
    component: AttendanceComponent0001,
  },
  {
    path: 'member2/billingmanagement0001',
    component: Billingmanagement0001Component,
  },
  {
    path: 'member3',
    component: Member3Component,
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
    path: 'member6',
    component: Member6Component,
  },
  {
    path: 'member7',
    component: Member7Component,
  },
  {
    path: 'member7/attandance',
    component: AttandanceComponent,
  },
  {
    path: 'member7/nitro-billing',
    component: NitroBillingComponent,
  },
  {
    path: 'member7/chat',
    component: Member7ChatComponent,
  },

  {
    path: 'member8',
    component: Member8Component,
  },
  {
    path: 'member9',
    component: Member9Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrpERoutingModule {}
