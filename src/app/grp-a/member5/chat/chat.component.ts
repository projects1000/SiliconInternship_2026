import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhoneMessage, SideNotification } from './models/chat.model';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  ramMessages: PhoneMessage[] = [];
  shyamMessages: PhoneMessage[] = [];
  ramInput = '';
  shyamInput = '';

  ramNotification: SideNotification | null = null;
  shyamNotification: SideNotification | null = null;

  private messageSub?: Subscription;
  private ramNotifTimer?: ReturnType<typeof setTimeout>;
  private shyamNotifTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private chatService: ChatService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.messageSub = this.chatService.message$.subscribe((msg) => {
      if (msg.sender === 'Ram') {
        this.ramMessages.push({
          text: msg.text,
          type: 'sent',
          timestamp: msg.timestamp,
        });
        this.shyamMessages.push({
          text: msg.text,
          type: 'received',
          timestamp: msg.timestamp,
        });
        this.showNotification('shyam', 'Ram', msg.text);
      } else {
        this.shyamMessages.push({
          text: msg.text,
          type: 'sent',
          timestamp: msg.timestamp,
        });
        this.ramMessages.push({
          text: msg.text,
          type: 'received',
          timestamp: msg.timestamp,
        });
        this.showNotification('ram', 'Shyam', msg.text);
      }
    });
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
    if (this.ramNotifTimer) clearTimeout(this.ramNotifTimer);
    if (this.shyamNotifTimer) clearTimeout(this.shyamNotifTimer);
  }

  sendAsRam(): void {
    const text = this.ramInput.trim();
    if (!text) return;
    this.chatService.sendMessage(text, 'Ram');
    this.ramInput = '';
  }

  sendAsShyam(): void {
    const text = this.shyamInput.trim();
    if (!text) return;
    this.chatService.sendMessage(text, 'Shyam');
    this.shyamInput = '';
  }

  goBackToProfile(): void {
    this.router.navigate(['grp-a/member5']);
  }

  private showNotification(
    side: 'ram' | 'shyam',
    from: string,
    text: string,
  ): void {
    const notification: SideNotification = { from, text, visible: true };

    if (side === 'ram') {
      if (this.ramNotifTimer) clearTimeout(this.ramNotifTimer);
      this.ramNotification = notification;
      this.ramNotifTimer = setTimeout(() => {
        if (this.ramNotification) {
          this.ramNotification = { ...this.ramNotification, visible: false };
        }
      }, 3000);
    } else {
      if (this.shyamNotifTimer) clearTimeout(this.shyamNotifTimer);
      this.shyamNotification = notification;
      this.shyamNotifTimer = setTimeout(() => {
        if (this.shyamNotification) {
          this.shyamNotification = { ...this.shyamNotification, visible: false };
        }
      }, 3000);
    }
  }
}
