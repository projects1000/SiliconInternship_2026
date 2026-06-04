import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { SwayamProfileComponent } from './swayam-profile/swayam-profile.component';

const routes: Routes = [
  { path: '', component: TeamDashboardComponent },
  { path: 'group-e/swayam-sahu', component: SwayamProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
