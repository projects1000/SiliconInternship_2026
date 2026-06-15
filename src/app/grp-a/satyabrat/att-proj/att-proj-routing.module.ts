import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceContainerComponent } from './attendance-container/attendance-container.component'; 
import { ProductManagementComponent } from '../product-management/product-management.component';
import { ProductLoginComponent } from '../product-management/components/login/product-login.component';
import { ChatContainerComponent } from '../chat-app/chat-container/chat-container.component';

const routes: Routes = [
  { path: '', component: AttendanceContainerComponent },
  { path: 'product-management', component: ProductManagementComponent },
  { path: 'product-management/login', component: ProductLoginComponent },
  { path: 'whatsapp', component: ChatContainerComponent }
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