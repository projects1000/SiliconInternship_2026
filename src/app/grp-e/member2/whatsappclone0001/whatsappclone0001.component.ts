import { Component } from '@angular/core';

interface Message {
  user: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-whatsappclone0001',
  templateUrl: './whatsappclone0001.component.html',
  styleUrls: ['./whatsappclone0001.component.css']
})
export class Whatsappclone0001Component {

  userAMessage = '';
  userBMessage = '';

  messages: Message[] = [];

  darkMode = false;

  sendMessage(user: string) {

    let text = '';

    if (user === 'User A') {
      text = this.userAMessage;

      if (!text.trim()) return;

      this.userAMessage = '';
    }

    if (user === 'User B') {
      text = this.userBMessage;

      if (!text.trim()) return;

      this.userBMessage = '';
    }

    this.messages.push({
      user,
      text,
      time: new Date().toLocaleTimeString()
    });

  }

  clearChat() {
    this.messages = [];
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

}