import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';

@NgModule({
  declarations: [
    HospitalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HospitalRoutingModule
  ]
})
export class HospitalModule { }
