import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';

@NgModule({
  declarations: [
    
    AppComponent,
    TeamDashboardComponent
  ],
  imports: [
    BrowserModule,
 
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }