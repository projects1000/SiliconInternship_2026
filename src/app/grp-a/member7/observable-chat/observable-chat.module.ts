import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ObservableChatRoutingModule } from './observable-chat-routing.module';
import { ObservableChatComponent } from './observable-chat.component';
import { UserAComponent } from './user-a/user-a.component';
import { UserBComponent } from './user-b/user-b.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    ObservableChatComponent,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,              // for ngModel in textareas
    ObservableChatRoutingModule
  ],
  providers: [
    ChatService               // scoped to this lazy-loaded module — fresh instance each session
  ]
})
export class ObservableChatModule {}
