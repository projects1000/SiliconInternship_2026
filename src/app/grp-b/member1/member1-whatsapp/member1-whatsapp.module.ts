// grp-b/member1/member1-whatsapp/member1-whatsapp.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WhatsappDashboardComponent } from './whatsapp-dashboard/whatsapp-dashboard.component';
import { WhatsappNavbarComponent } from './components/whatsapp-navbar/whatsapp-navbar.component';
import { UserAComponent } from './components/user-a/user-a.component';
import { UserBComponent } from './components/user-b/user-b.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

@NgModule({
  declarations: [
    WhatsappDashboardComponent,
    WhatsappNavbarComponent,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    WhatsappDashboardComponent,
    WhatsappDashboardComponent,
    WhatsappNavbarComponent,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent,
  ],
})
export class Member1WhatsappModule {}