import { Component } from '@angular/core';

interface ChatMessage {
  from: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent {

  senderText = '';
  receiverText = '';

  senderMessages: ChatMessage[] = [];
  receiverMessages: ChatMessage[] = [];

  senderNotification = 0;
  receiverNotification = 0;

  getTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  sendFromSender() {

    if (this.senderText.trim()) {

      const time = this.getTime();

      this.senderMessages.push({
        from: 'You',
        text: this.senderText,
        time: time
      });

      this.receiverMessages.push({
        from: 'Sangita',
        text: this.senderText,
        time: time
      });

      this.receiverNotification++;

      this.senderText = '';
    }
  }

  sendFromReceiver() {

    if (this.receiverText.trim()) {

      const time = this.getTime();

      this.receiverMessages.push({
        from: 'You',
        text: this.receiverText,
        time: time
      });

      this.senderMessages.push({
        from: 'Chandan',
        text: this.receiverText,
        time: time
      });

      this.senderNotification++;

      this.receiverText = '';
    }
  }

  clearSenderNotification() {
    this.senderNotification = 0;
  }

  clearReceiverNotification() {
    this.receiverNotification = 0;
  }
}