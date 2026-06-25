import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttProjRoutingModule } from './att-proj-routing.module';
import { SatyabratModule } from '../satyabrat.module';

// ---> FIX: MatNativeDateModule is imported from 'core' <---
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { AttendanceContainerComponent } from './attendance-container/attendance-container.component';
import { TreeComponent } from './components/tree/tree.component';
import { TableComponent } from './components/table/table.component';
import { SearchComponent } from './components/search/search.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    AttendanceContainerComponent,
    TreeComponent,
    TableComponent,
    SearchComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    AttProjRoutingModule,
    SatyabratModule,
    
    MatTreeModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class AttProjModule { }