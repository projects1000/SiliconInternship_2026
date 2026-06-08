import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceContainerComponent } from './attendance-container/attendance-container.component'; 

const routes: Routes = [
  { path: '', component: AttendanceContainerComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ],
  exports: [
    RouterModule 
  ]
})
export class AttProjRoutingModule { }