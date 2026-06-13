import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @ViewChild('messageContainer')
  messageContainer!: ElementRef;

  messages: any[] = [];

  typingUser = '';

  typingTimeout: any;

  currentTheme = 'love';


  constructor(
    private chatService: ChatService,
    private notificationService: NotificationService
  ) { }

  scrollToBottom() {

    setTimeout(() => {

      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;

    }, 0);

  }

  ngOnInit(): void {

    this.chatService.messages$
      .subscribe(message => {

        this.messages.push(message);

        this.scrollToBottom();

      });

    this.chatService.typing$
      .subscribe(user => {

        this.typingUser = user;

        clearTimeout(this.typingTimeout);

        if (user) {

          this.typingTimeout =
            setTimeout(() => {

              this.typingUser = '';

            }, 1000);

        }

      });

  }

  get totalMessages(): number {
    return this.messages.length;
  }

  get lastMessage(): string {

    if (this.messages.length === 0) {
      return '';
    }

    return this.messages[
      this.messages.length - 1
    ].text;
  }

  clearChat() {

    this.messages = [];

    this.notificationService.sendMessage(
      '🗑 Chat cleared successfully.'
    );


  }
}
