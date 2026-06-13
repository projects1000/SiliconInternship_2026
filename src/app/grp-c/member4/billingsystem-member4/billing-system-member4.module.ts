import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingsystemMember4Component } from './billingsystem-member4.component';
import { GrpCmember4productsComponent } from './grp-cmember4products/grp-cmember4products.component';
import { GrpCmember4registerComponent } from './grp-cmember4register/grp-cmember4register.component';
import { GrpCmember4billComponent } from './grp-cmember4bill/grp-cmember4bill.component';
import { GrpCmember4settingsComponent } from './grp-cmember4settings/grp-cmember4settings.component';
import { GrpCmember4notificationComponent } from './grp-cmember4notification/grp-cmember4notification.component';
import { AttendanceComponent } from "src/app/grp-e/member1/attendance/attendance.component";
import { CoffeeComponent } from './grp-cmember4products/coffee/coffee.component';
import { DrinksComponent } from './grp-cmember4products/drinks/drinks.component';
import { PizzaComponent } from './grp-cmember4products/pizza/pizza.component';
import { BurgerComponent } from './grp-cmember4products/burger/burger.component';
import { FriesComponent } from './grp-cmember4products/fries/fries.component';
import { SandwichComponent } from './grp-cmember4products/sandwich/sandwich.component';
import { PastaComponent } from './grp-cmember4products/pasta/pasta.component';
import { CakeComponent } from './grp-cmember4products/cake/cake.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BillingsystemMember4Component,
        GrpCmember4productsComponent,
        GrpCmember4registerComponent,
        GrpCmember4billComponent,
        GrpCmember4settingsComponent,
        GrpCmember4notificationComponent,
        CoffeeComponent,
        DrinksComponent,
        PizzaComponent,
        BurgerComponent,
        FriesComponent,
        SandwichComponent,
        PastaComponent,
        CakeComponent,

      
  ],
  imports: [
    CommonModule,
    AttendanceComponent,
    FormsModule
],
  exports: [
    BillingsystemMember4Component
  ]
})
export class BillingSystemMember4Module { }
