import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Member1Component } from './member1.component';
import { Member1RoutingModule } from './member1-routing.module';

@NgModule({
  declarations: [
    Member1Component
  ],
  imports: [
    CommonModule,
    Member1RoutingModule
  ]
})
export class Member1Module { }