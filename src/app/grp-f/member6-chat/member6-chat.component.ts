import { Component } from '@angular/core';

@Component({
  selector: 'app-member6-chat',
  templateUrl: './member6-chat.component.html',
  styleUrls: ['./member6-chat.component.css']
})
export class Member6ChatComponent {

  selectedUser = 'Rahul';

  newMessage = '';

  teamMembers = [
    'Suvashree',
    'Bhabani',
    'soumyashree',
    'Rajshree'
  ];

  messages: any[] = [
    {
      sender: 'Bhabani',
      text: 'Hello Sukanya 👋',
      time: '10:00 AM'
    }
  ];

  selectUser(user: string) {
    this.selectedUser = user;
  }

  sendMessage() {

    if (!this.newMessage.trim()) {
      return;
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    this.messages.push({
      sender: 'Sukanya',
      text: this.newMessage,
      time: currentTime
    });

    const messageText = this.newMessage;

    this.newMessage = '';

    setTimeout(() => {

      this.messages.push({
        sender: this.selectedUser,
        text: 'Received: ' + messageText + ' 👍',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      });

    }, 1000);
  }
}