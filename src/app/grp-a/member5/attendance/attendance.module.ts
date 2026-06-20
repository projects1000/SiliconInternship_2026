import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { Member5AttendanceComponent } from './attendance.component';

@NgModule({
  declarations: [Member5AttendanceComponent],
  imports: [CommonModule, FormsModule, AttendanceRoutingModule],
})
export class AttendanceModule {}
