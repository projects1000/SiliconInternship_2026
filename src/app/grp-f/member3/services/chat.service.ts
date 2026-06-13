import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: any[] = [];

  typingUser = '';

  constructor() {

    const savedMessages =
      localStorage.getItem('whatsappMessages');

    if (savedMessages) {

      this.messages =
        JSON.parse(savedMessages);

    }

  }

  sendMessage(
    sender: string,
    text: string
  ) {

    this.messages.push({

      sender,

      text,

      time: new Date()

    });

    this.saveMessages();

    this.typingUser = '';

  }

  deleteMessage(index: number) {

    this.messages.splice(index, 1);

    this.saveMessages();

  }

  setTyping(user: string) {

    this.typingUser = user;

    setTimeout(() => {

      if (this.typingUser === user) {

        this.typingUser = '';

      }

    }, 2000);

  }

  saveMessages() {

    localStorage.setItem(
      'whatsappMessages',
      JSON.stringify(this.messages)
    );

  }

  clearChat() {

    this.messages = [];

    localStorage.removeItem(
      'whatsappMessages'
    );

  }

}