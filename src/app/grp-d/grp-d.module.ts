import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { GrpDRoutingModule } from './grp-d-routing.module';

// Layout & Members
import { GrpDComponent } from './grp-d/grp-d.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member5Component } from './member5/member5.component';
import { Member6Component } from './member6/member6.component';
import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
import { Member10Component } from './member10/member10.component';
import { Member11Component } from './member11/member11.component';

// Member 1 Functionality
import { AttendanceComponent } from './member1/attendance/attendance.component';
import { ProductManagementComponent as Member1Prod } from './member1/product-management/product-management.component';
import { ProductListComponent as Member1List } from './member1/product-list/product-list.component';
import { CustomerDetailsComponent } from './member1/customer-details/customer-details.component';
import { BillDetailsComponent } from './member1/bill-details/bill-details.component';

// Member 3 Functionality
import { AttendanceTrackerComponent } from './member3/attendance-tracker/attendance-tracker.component';
import { ProductManagementComponent as Member3Prod } from './member3/product-management/product-management.component';
import { ProductLisComponent as Member3List } from './member3/product-lis/product-lis.component';
import { ProductFormComponent } from './member3/product-form/product-form.component';
import { BillingComponent } from './member3/billing/billing.component';
import { ChatWindowComponent } from './member3/chat-window/chat-window.component';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    GrpDComponent,
    Member1Component,
    Member2Component,
    Member3Component,
    Member4Component,
    Member5Component,
    Member6Component,
    Member7Component,
    Member8Component,
    Member9Component,
    Member10Component,
    Member11Component,
    AttendanceComponent,
    Member1Prod,
    Member1List,
    CustomerDetailsComponent,
    BillDetailsComponent,
    AttendanceTrackerComponent,
    Member3Prod,
    Member3List,
    ProductFormComponent,
    BillingComponent,
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GrpDRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTreeModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GrpDModule { }