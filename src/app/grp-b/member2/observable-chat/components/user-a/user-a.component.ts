import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-a',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class UserAComponent implements OnDestroy {
  messageText = '';
  isOnline = true;
  private onlineSub: Subscription;

  constructor(private chatService: ChatService) {
    this.onlineSub = this.chatService.onlineStatus$.subscribe(status => {
      this.isOnline = status.userA;
    });
  }

  sendMessage() {
    if (!this.messageText.trim()) return;
    this.chatService.sendMessage('userA', 'Rohan', this.messageText);
    this.messageText = '';
    this.chatService.setTyping('userA', false);
  }

  onTyping() {
    this.chatService.setTyping('userA', this.messageText.length > 0);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'file';
      this.chatService.sendFile('userA', 'Rohan', file, type);
    }
  }

  ngOnDestroy() {
    if (this.onlineSub) this.onlineSub.unsubscribe();
  }
}
