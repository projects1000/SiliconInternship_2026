// src/app/grp-f/grp-f-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrpFComponent } from './grp-f/grp-f.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Member3Component } from './member3/member3.component';
import { Member4Component } from './member4/member4.component';
import { Member4AttendanceComponent} from './member4/attendance/attendance.component';
import{BillingComponent} from './member4/billing/billing.component';

import{NotificationComponent} from './member4/notification/notification.component';
import{ProductListComponent} from './member4/product-list/product-list.component';
import{ProductManagementComponent} from './member4/product-management/product-management.component';
import{ToastService} from './member4/shared/toast.service';
import{ProductService} from './member4/shared/product.service';
import{FooterComponent} from './member4/footer/footer.component';
import{ProductDetailComponent} from './member4/product-detail/product-detail.component';
import{LoginComponent} from './member4/login/login.component';
import{CartComponent} from './member4/cart/cart.component';
import{CheckoutComponent} from './member4/checkout/checkout.component';
import{ChatService} from './member4/chat-service/chat.service';
import { CustomerService } from './member4/shared/customer.service';
import { Member5Component } from './member5/member5.component';
import { AttendanceComponent } from './member5/attendance/attendance.component';
import { Member5ChatWindowComponent }
from './member5/member5-chat-window/member5-chat-window.component';
import { Member6Component } from './member6/member6.component';
import { Member6AttendanceComponent } from './member6-attendance/member6-attendance.component';
import { Member6ChatComponent } from './member6-chat/member6-chat.component';
import { Member7Component } from './member7/member7.component';
import { Member8Component } from './member8/member8.component';
import { Member9Component } from './member9/member9.component';
import { Member10Component } from './member10/member10.component';
import { StudentAComponent } from './member4/student-a/student-a.component';
import { StudentBComponent } from './member4/student-b/student-b.component';
import { ChatWindowComponent } from './member4/chat-window/chat-window.component';




const routes: Routes = [
  
  { path: 'member10/chatapp',         
   component: Member10ChatAppComponent },  // ← NEW
  {
    path: '',
    component: GrpFComponent
  },
  {
    path: 'member1',
    component: Member1Component
  },
  
  {
    path: 'member2',
    component: Member2Component
  },
  {
 path: 'member2/member2-attendance',
 component: Member2AttendanceComponent
},
{
  path: 'member2/attendance-history',
  component: AttendanceHistoryComponent
},
{
  path: 'member2/product-management',
  component: ProductDashboardComponent
},
{
  path:'member2/whatsapp-chat',
  component:WhatsappChatDashboardComponent
},

  {
    path: 'member3',
    component: Member3Component
  },
  {
    path: 'member4',
    component: Member4Component
  },
  {
    path: 'member4/attendance',
    component: Member4AttendanceComponent
  },
  {
    path: 'member4/billing',
    component: BillingComponent
  },
 
  {
    path: 'member4/notification',
    component: NotificationComponent
  },
  {
    path: 'member4/product-list',
    component: ProductListComponent
  },
  {
    path: 'member4/product-management',
    component: ProductManagementComponent
  },
 
 
 {
  path:'member4/footer',
  component:FooterComponent
 },
 {path:'member4/login',
 component:LoginComponent
 },
 {path:'member4/shared/toast.service',
 component:ToastService
 },
{
  path:'member4/shared/customer.Service',
  component: CustomerService
},
 {path:'member4/shared/product.service',
  component:ProductService
 },
 {path:'member4/product-detail/:id',
 component:ProductDetailComponent
 },
 {path:'member4/cart',
 component:CartComponent
 },
 {path:'member4/checkout',
  component:CheckoutComponent
 },
 {path:'member4/StudentAComponent',
  component:StudentAComponent
 },
 {path:'member4/StudentBComponent',
  component:StudentBComponent
 },
 {path:'member4/chat-window',
  component:ChatWindowComponent
 },
 {path:'member4/chat-service',
   component:ChatService
 },


  {
    path: 'member5',
    component: Member5Component
  },
  {
  path: 'member5/attendance',
  component: Member5AttendanceComponent
},
   {
    path: 'member5/member5-chat-window',
    component: Member5ChatWindowComponent
  },
  {
    path: 'member6',
    component: Member6Component
  },
  {
    path: 'member6-chat',
    component: Member6ChatComponent
  },
  {
    path: 'member6-attendance',
    component: Member6AttendanceComponent
  },
  {
    path: 'member7',
    component: Member7Component
  },
  {
  path: 'member7/attendance',
  component: Member7AttendanceComponent
},

  {
    path: 'member7/chat',
    component: ChatComponent
  },
  {
    path: 'member8',
    component: Member8Component
  },
  {
    path: 'member9',
    component: Member9Component
  },
  {
    path: 'member10',
    component: Member10Component
  },
  {
    path: 'member10/attendance-dashboard',
    component: Member10AttendanceDashboardComponent
  },
  {
    path: 'member10/billing',
    component: BillingComponent
  }
  
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrpFRoutingModule {}