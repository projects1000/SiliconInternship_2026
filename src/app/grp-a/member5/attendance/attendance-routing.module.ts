import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Member5AttendanceComponent } from './attendance.component';

const routes: Routes = [
  { path: '', component: Member5AttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
