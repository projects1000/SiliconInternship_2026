// grp-b/member1/member1-whatsapp/components/user-b/user-b.component.ts
import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css'],
})
export class UserBComponent {
  messageText: string = '';

  constructor(
    private chatService: ChatService,
    private toastr: ToastrService,
  ) {}

  onSend() {
    // Failure Condition: Input contains no valid characters
    if (!this.messageText || !this.messageText.trim()) {
      this.toastr.warning(
        'Cannot send an empty message packet!',
        'Mayur Action Status',
      );
      return;
    }

    // Success Path
    this.chatService.sendMessage(this.messageText, 'Mayur');
    this.toastr.success(
      'Message synchronized successfully.',
      'Mayur Action Status',
    );
    this.messageText = '';
  }
}
