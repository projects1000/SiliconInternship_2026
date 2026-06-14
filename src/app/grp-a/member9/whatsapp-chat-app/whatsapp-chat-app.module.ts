import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WhatsappChatAppRoutingModule } from './whatsapp-chat-app-routing.module';

import { WhatsappChatComponent } from './whatsapp-chat/whatsapp-chat.component';

import { UserAComponent } from './components/user-a/user-a.component';
import { UserBComponent } from './components/user-b/user-b.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

@NgModule({
  declarations: [
    WhatsappChatComponent,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent,
  ],
  imports: [CommonModule, FormsModule, WhatsappChatAppRoutingModule],
})
export class WhatsappChatAppModule {}
