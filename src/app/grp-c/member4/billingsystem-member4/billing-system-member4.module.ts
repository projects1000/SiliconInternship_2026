import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingsystemMember4Component } from './billingsystem-member4.component';
import { GrpCmember4productsComponent } from './grp-cmember4products/grp-cmember4products.component';
import { GrpCmember4registerComponent } from './grp-cmember4register/grp-cmember4register.component';
import { GrpCmember4billComponent } from './grp-cmember4bill/grp-cmember4bill.component';
import { GrpCmember4settingsComponent } from './grp-cmember4settings/grp-cmember4settings.component';
import { GrpCmember4notificationComponent } from './grp-cmember4notification/grp-cmember4notification.component';


@NgModule({
  declarations: [
    BillingsystemMember4Component,
        GrpCmember4productsComponent,
        GrpCmember4registerComponent,
        GrpCmember4billComponent,
        GrpCmember4settingsComponent,
        GrpCmember4notificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BillingsystemMember4Component
  ]
})
export class BillingSystemMember4Module { }
