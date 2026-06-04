import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { RohanProfileComponent } from './rohan-profile/rohan-profile.component';

@NgModule({
  declarations: [
    
    AppComponent,
    TeamDashboardComponent,
    RohanProfileComponent
  ],
  imports: [
    BrowserModule,
 
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }