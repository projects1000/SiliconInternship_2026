import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { SwayamProfileComponent } from './swayam-profile/swayam-profile.component';

@NgModule({
  declarations: [

    AppComponent,
    TeamDashboardComponent,
    SwayamProfileComponent
  ],
  imports: [
    BrowserModule,

    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
