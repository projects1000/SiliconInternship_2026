import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  // 1. Message array to hold the history
  messages: { sender: string, text: string, time: string }[] = [
    { sender: 'Arjun', text: 'Hey Priya, is the project ready?', time: '12:45 PM' },
    { sender: 'Priya', text: 'Almost there! Just finishing the documentation.', time: '12:47 PM' }
  ];

  // 2. Separate variables for the two different textareas
  msgArjun: string = '';
  msgPriya: string = '';

  // 3. The Send Logic
  send(sender: string) {
    // Determine which input text to use based on the sender
    const textToSend = sender === 'Arjun' ? this.msgArjun : this.msgPriya;

    if (textToSend && textToSend.trim() !== '') {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Push message to the central array
      this.messages.push({
        sender: sender,
        text: textToSend.trim(),
        time: time
      });

      // Clear the specific input field
      if (sender === 'Arjun') {
        this.msgArjun = '';
      } else {
        this.msgPriya = '';
      }

      // Optional: Scroll to bottom logic can be added here
    }
  }
}