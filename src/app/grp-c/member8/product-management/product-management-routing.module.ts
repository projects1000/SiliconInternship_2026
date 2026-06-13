import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { member8ProductManagementComponent } from './product-management/product-management.component';
const routes: Routes = [
  {
    path: '',
    component: member8ProductManagementComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
