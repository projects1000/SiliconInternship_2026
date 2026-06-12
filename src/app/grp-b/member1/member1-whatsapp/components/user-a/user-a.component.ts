// grp-b/member1/member1-whatsapp/components/user-a/user-a.component.ts
import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ToastrService } from 'ngx-toastr'; // Injecting the toast engine directly

@Component({
  selector: 'app-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css'],
})
export class UserAComponent {
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
        'Gents Action Status',
      );
      return;
    }

    // Success Path
    this.chatService.sendMessage(this.messageText, 'Gents');
    this.toastr.success(
      'Message synchronized successfully.',
      'Gents Action Status',
    );
    this.messageText = '';
  }
}
