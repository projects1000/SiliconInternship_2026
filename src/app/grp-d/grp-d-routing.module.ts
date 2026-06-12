import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';



// Layout & Members

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



// Functionality Components

import { AttendanceComponent } from './member1/attendance/attendance.component';

import { AttendanceTrackerComponent } from './member3/attendance-tracker/attendance-tracker.component';

import { BillingComponent } from './member3/billing/billing.component';



// Aliased Imports

import { ProductManagementComponent as Member1Prod } from './member1/product-management/product-management.component';

import { ProductManagementComponent as Member3Prod } from './member3/product-management/product-management.component';



const routes: Routes = [

  { path: '', component: GrpDComponent },

  

  // Member 1

  { path: 'member1', component: Member1Component },

  { path: 'member1/attendance', component: AttendanceComponent },

  { path: 'member1/product-management', component: Member1Prod },

  

  // Member 2

  { path: 'member2', component: Member2Component },

  

  // Member 3 (Nested Routing)

  { 

    path: 'member3', 

    component: Member3Component,

    children: [

      { path: 'attendance-matrix', component: AttendanceTrackerComponent },

      { path: 'product-management', component: Member3Prod },

      { path: 'billing', component: BillingComponent },

      { path: '**', redirectTo: 'product-management' }

    ]

  },

  

  // Other members

  { path: 'member4', component: Member4Component },

  { path: 'member5', component: Member5Component },

  { path: 'member6', component: Member6Component },

  { path: 'member7', component: Member7Component },

  { path: 'member8', component: Member8Component },

  { path: 'member9', component: Member9Component },

  { path: 'member10', component: Member10Component },

  { path: 'member11', component: Member11Component }

];



@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class GrpDRoutingModule {}