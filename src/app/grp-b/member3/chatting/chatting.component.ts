import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { MEMBER3_NAV_ITEMS, Member3NavItem } from './constants/member3-navigation.constants';
import { ChatService } from './services/chat.service';
import { ChatMessage, ChatUserId } from './models/chat.models';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css'],
  providers: [ChatService],
  animations: [
    trigger('messageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px) scale(0.96)' }),
        animate('280ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ])
  ]
})
export class ChattingComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  readonly sidebarItems = MEMBER3_NAV_ITEMS;
  readonly filteredMessages$: Observable<ChatMessage[]>;
  readonly userOneId: ChatUserId = 'User 1';
  readonly userTwoId: ChatUserId = 'User 2';

  draftUser1 = '';
  draftUser2 = '';
  searchInput = '';
  private shouldScroll = false;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    readonly chatService: ChatService
  ) {
    this.filteredMessages$ = this.chatService.filteredMessages$;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.filteredMessages$.subscribe(() => {
        this.shouldScroll = true;
      })
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToLatest();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isSidebarActive(item: Member3NavItem): boolean {
    return item.route === '/grp-b/member3/chatting';
  }

  navigateSidebar(item: Member3NavItem): void {
    if (!this.isSidebarActive(item)) {
      this.router.navigate([item.route]);
    }
  }

  onSearchChange(value: string): void {
    this.searchInput = value;
    this.chatService.setSearchQuery(value);
  }

  onKeyDown(event: KeyboardEvent, userId: ChatUserId): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(userId);
    }
  }

  sendMessage(userId: ChatUserId): void {
    const text = userId === this.userOneId ? this.draftUser1 : this.draftUser2;
    if (!text.trim()) {
      return;
    }

    this.chatService.sendMessage(userId, text);

    if (userId === this.userOneId) {
      this.draftUser1 = '';
    } else {
      this.draftUser2 = '';
    }

    this.shouldScroll = true;
  }

  isUserOneMessage(message: ChatMessage): boolean {
    return message.sender === this.userOneId;
  }

  trackByMessageId(_index: number, message: ChatMessage): string {
    return message.id;
  }

  formatTimestamp(date: Date): string {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  }

  goBackToProfile(): void {
    this.router.navigate(['/grp-b/member3']);
  }

  private scrollToLatest(): void {
    const container = this.messagesContainer?.nativeElement;
    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }
}
