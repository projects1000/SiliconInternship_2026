import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService, ChatMessage } from './chat.service';

interface Toast {
  id: number;
  text: string;
  sender: 'gents' | 'mayur';
}

@Component({
  selector: 'app-observable-chat',
  templateUrl: './observable-chat.component.html',
  styleUrls: ['./observable-chat.component.css']
})
export class ObservableChatComponent implements OnInit, OnDestroy {

  // ── Statistics (updated on every message) ─────────────────────────────
  totalMessages = 0;
  gentsCount    = 0;
  mayurCount    = 0;
  latestMsg: ChatMessage | null = null;

  // ── Observable Flow Animation ──────────────────────────────────────────
  // flowStep: -1=idle, 0=sender glow, 1=subject, 2=observable, 3=chat window
  flowStep   = -1;
  flowSender: 'gents' | 'mayur' | null = null;

  // ── Toast System ───────────────────────────────────────────────────────
  toasts: Toast[] = [];
  private toastId = 0;

  private msgSub!: Subscription;
  private clrSub!: Subscription;

  constructor(
    private router: Router,
    public  chatService: ChatService   // public so template can call clearAll()
  ) {}

  ngOnInit(): void {
    // subscribe() — parent tracks stats & drives toasts + flow animation
    this.msgSub = this.chatService.messages$.subscribe(msg => {
      this.totalMessages++;
      if (msg.sender === 'gents') this.gentsCount++;
      else this.mayurCount++;
      this.latestMsg = msg;
      this.addToast(msg);
      this.animateFlow(msg.sender);
    });

    // subscribe() — reset stats when chat is cleared
    this.clrSub = this.chatService.clear$.subscribe(() => {
      this.totalMessages = 0;
      this.gentsCount    = 0;
      this.mayurCount    = 0;
      this.latestMsg     = null;
      this.flowStep      = -1;
      this.flowSender    = null;
    });
  }

  ngOnDestroy(): void {
    this.msgSub?.unsubscribe();
    this.clrSub?.unsubscribe();
  }

  // ── Flow animation: step through nodes with delays ────────────────────
  animateFlow(sender: 'gents' | 'mayur'): void {
    this.flowSender = sender;
    this.flowStep   = 0;                                    // sender lit
    setTimeout(() => this.flowStep = 1, 350);              // Subject
    setTimeout(() => this.flowStep = 2, 750);              // Observable
    setTimeout(() => this.flowStep = 3, 1150);             // Chat Window
    setTimeout(() => { this.flowStep = -1; this.flowSender = null; }, 2200);
  }

  // ── Toast helpers ──────────────────────────────────────────────────────
  addToast(msg: ChatMessage): void {
    const id   = ++this.toastId;
    const text = `${msg.senderName}: ${msg.message}`;
    this.toasts.push({ id, text, sender: msg.sender });
    setTimeout(() => this.removeToast(id), 3500);
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  trackToast(_: number, t: Toast): number { return t.id; }

  formatTime(d: Date | null): string {
    if (!d) return '';
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: true
    }).format(d);
  }

  goBack(): void {
    this.router.navigate(['/grp-a/member7']);
  }
}
