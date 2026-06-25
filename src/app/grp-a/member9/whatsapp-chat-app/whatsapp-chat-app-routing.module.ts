import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhatsappChatComponent } from './whatsapp-chat/whatsapp-chat.component';

const routes: Routes = [
  {
    path: '',
    component: WhatsappChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsappChatAppRoutingModule {}