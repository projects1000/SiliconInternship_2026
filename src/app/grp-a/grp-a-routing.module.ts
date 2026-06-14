import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

// ── MEMBER 9 CUSTOM COMPONENTS ───────────────────────────────────────────
import { AttendanceComponent } from './member9/attendance/attendance.component';
import { ProductManagementComponent } from './member9/product-management/product-management.component'; // <-- 1. ADDED THIS IMPORT

const routes: Routes = [
  {
    path: '',
    component: GrpAComponent,
  },
  {
    path: 'member1',
    component: Member1Component,
  },
  {
    path: 'member2',
    component: Member2Component,
  },
  {
    path: 'member2/attendance',
    loadChildren: () =>
      import('./member2/attendance/attendance.module').then(
        (m) => m.AttendanceModule,
      ),
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
    path: 'member6/attendance',
    loadChildren: () =>
      import('./satyabrat/att-proj/att-proj.module').then(
        (m) => m.AttProjModule,
      ),
  },
  {
    path: 'member7',
    component: Member7Component,
  },
  {
    path: 'member7/attendance',
    loadChildren: () =>
      import('./member7/attendance/attendance.module').then(
        (m) => m.AttendanceModule,
      ),
  },
  {
    path: 'member8',
    component: Member8Component,
  },
  {
    path: 'member9',
    component: Member9Component,
  },
  {
    path: 'member9/whatsapp-chat-app',
    loadChildren: () =>
      import('./member9/whatsapp-chat-app/whatsapp-chat-app.module').then(
        (m) => m.WhatsappChatAppModule,
      ),
  },
  {
    path: 'member9/attendance',
    component: AttendanceComponent,
  },
  {
    path: 'member9/product-management',
    component: ProductManagementComponent,
  },
  // { 
  //   path: 'member9/billing-system', 
  //   loadChildren: () => import('./member9/billing-system/billing-system.module').then(m => m.BillingSystemModule) 
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrpARoutingModule {}
