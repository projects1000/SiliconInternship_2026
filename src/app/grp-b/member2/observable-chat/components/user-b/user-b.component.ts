import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-b',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class UserBComponent implements OnDestroy {
  messageText = '';
  isOnline = true;
  private onlineSub: Subscription;

  constructor(private chatService: ChatService) {
    this.onlineSub = this.chatService.onlineStatus$.subscribe(status => {
      this.isOnline = status.userB;
    });
  }

  sendMessage() {
    if (!this.messageText.trim()) return;
    this.chatService.sendMessage('userB', 'Gaurav', this.messageText);
    this.messageText = '';
    this.chatService.setTyping('userB', false);
  }

  onTyping() {
    this.chatService.setTyping('userB', this.messageText.length > 0);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'file';
      this.chatService.sendFile('userB', 'Gaurav', file, type);
    }
  }

  ngOnDestroy() {
    if (this.onlineSub) this.onlineSub.unsubscribe();
  }
}
