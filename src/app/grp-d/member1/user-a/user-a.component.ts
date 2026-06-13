import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService, ChatMessage, Contact } from '../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-a',
  template: `
    <div class="phone-deck-wrapper">
      <div class="device-hardware-label">USER - A</div>

      <div class="phone-3d-base">
        <div class="phone-screen">
          <div class="notch"></div>
          <div class="status-bar"><span>9:41</span><div>📶 🔋</div></div>

          <div class="popup-notification" *ngIf="alert" (click)="selectTarget('USER-B')">
            <div class="action-circle-btn" style="width:24px; height:24px; font-size:0.7rem;">⚡</div>
            <div class="popup-text"><h6>{{ alert.sender }}</h6><p>{{ alert.text }}</p></div>
          </div>

          <div class="inapp-modal-overlay" *ngIf="showAddModal">
            <div class="inapp-card">
              <h4>Create Subscriber Address</h4>
              <input type="text" [(ngModel)]="newContactName" placeholder="Enter custom identifier label..." (keyup.enter)="saveContact()"/>
              <div class="inapp-btn-row">
                <button class="inapp-btn cancel" (click)="showAddModal = false">Cancel</button>
                <button class="inapp-btn save" (click)="saveContact()">Commit Line</button>
              </div>
            </div>
          </div>

          <div class="app-header">
            <div class="header-user-meta" *ngIf="activeTarget">
              <button class="back-btn" (click)="exitToRoster()">◀</button>
              <div>
                <h4>{{ activeTarget }}</h4>
                <p>{{ typingStatus || 'Online' }}</p>
              </div>
            </div>
            <div class="header-user-meta" *ngIf="!activeTarget"><h2>Messages</h2></div>
            
            <div class="header-actions-dropdown" *ngIf="activeTarget">
              <button class="mini-action-btn" (click)="clearLogs()">Clear</button>
              <button class="mini-action-btn" (click)="deleteContact()">Delete</button>
            </div>
            <button class="action-circle-btn" *ngIf="!activeTarget" (click)="openAddContactModal()">+</button>
          </div>

          <div class="contact-scroll-area" *ngIf="!activeTarget">
            <div class="search-wrapper"><input class="search-box" type="text" placeholder="Search operational lines..." /></div>
            <div class="contact-card" *ngFor="let c of contactRoster" (click)="selectTarget(c.name)">
              <img class="avatar-img" [src]="c.avatar" />
              <div class="card-center"><h5>{{ c.name }}</h5><p>{{ c.lastMessage }}</p></div>
              <div class="card-right">
                <span class="time">{{ c.time }}</span>
                <span class="badge-count" style="display: inline-block; background: #ff3b30; color: white; border-radius: 10px; min-width: 18px; height: 18px; text-align: center; line-height: 18px; font-size: 0.7rem; font-weight: bold; padding: 0 4px;" *ngIf="c.unreadCount > 0">
                  {{ c.unreadCount }}
                </span>
              </div>
            </div>
          </div>

          <div class="chat-messages-container" *ngIf="activeTarget" #scrollContainer>
            <div *ngFor="let msg of chatLogs" [ngClass]="['message-row', msg.sender === 'USER-A' ? 'sent' : 'received']">
              <div class="chat-bubble">
                <button class="trash-trigger" (click)="removeMessage(msg.id)">✕</button>
                <p *ngIf="msg.mediaType === 'text'">{{ msg.text }}</p>
                <img *ngIf="msg.mediaType === 'image'" class="media-img" [src]="msg.mediaUrl" style="max-width: 100%; border-radius: 8px; margin-top: 5px;" />
                <div class="bubble-meta">
                  <span>{{ msg.timestamp | date:'shortTime' }}</span>
                  <span *ngIf="msg.sender === 'USER-A'" class="ticks" [ngClass]="{'read': msg.status === 'read'}">✓✓</span>
                </div>
              </div>
            </div>
          </div>

          <div class="input-dock" *ngIf="activeTarget">
            <div class="emoji-drawer-panel" *ngIf="showEmojis">
              <button class="emoji-item" *ngFor="let e of emojiBank" (click)="appendEmoji(e)">{{ e }}</button>
            </div>
            <div class="dock-main-row">
              <div class="input-pill">
                <button class="dock-icon" (click)="showEmojis = !showEmojis">😊</button>
                <input type="text" [(ngModel)]="textDraft" placeholder="Write message..." (focus)="typeNotify(true)" (blur)="typeNotify(false)" (keyup.enter)="send()"/>
                
                <input type="file" #fileInputA style="display:none;" (change)="uploadDeviceFile($event)" accept="image/*"/>
                <button class="dock-icon" (click)="fileInputA.click()">📎</button>
                <button class="dock-icon" (click)="activateHardwareCamera()">📷</button>
              </div>
              <button class="mic-circle-btn" (click)="send()">➔</button>
            </div>
          </div>

          <div class="nav-grid-footer" *ngIf="!activeTarget">
            <button class="nav-item active">💬</button><button class="nav-item">📷</button><button class="nav-item">🔀</button><button class="nav-item">⚙️</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../chat-window/chat-window.component.css']
})
export class UserAComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollingView!: ElementRef;
  
  activeTarget: string | null = null; 
  textDraft: string = '';
  chatLogs: ChatMessage[] = [];
  contactRoster: Contact[] = [];
  typingStatus: string | null = null;
  alert: { sender: string; text: string } | null = null;
  showEmojis = false;
  showAddModal = false;
  newContactName = '';
  emojiBank = ['🔥','👍','⚡','🚀','💯','💻','💎','👾'];
  private subs = new Subscription();

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.subs.add(this.chat.messages$.subscribe(() => {
      this.reloadHistory();
      this.calculateLocalUnreadBadges();
    }));
    
    this.subs.add(this.chat.contactsPhoneA$.subscribe(list => {
      this.contactRoster = list;
      this.calculateLocalUnreadBadges();
    }));
    
    this.subs.add(this.chat.activeTargetPhoneA$.subscribe(t => { 
      this.activeTarget = t || null; 
      this.reloadHistory(); 
    }));
    
    this.subs.add(this.chat.typingState$.subscribe(st => {
      if (this.activeTarget) this.typingStatus = st['USER-B->USER-A'] || null;
    }));
    
    // FIXED: Captures explicit broadcast notifications designated for User A's end device
    this.subs.add(this.chat.notifications$.subscribe(n => {
      if (n.receiver === 'A') { 
        this.alert = n; 
        setTimeout(() => this.alert = null, 3000); 
      }
    }));
    
    this.reloadHistory();

    // FIXED: Force User A to boot on the main messages tracking list instead of inside a pre-locked room!
    setTimeout(() => { this.chat.setPhoneTarget('A', ''); }, 100);
  }

  ngAfterViewChecked() { this.scrollToBottom(); }

  reloadHistory() {
    this.chatLogs = this.chat.getMessagesForSession('USER-A', 'USER-B');
  }

  // FIXED: Explicit lookup algorithm to compute counts from User B when User A is on the main list
  calculateLocalUnreadBadges() {
    if (this.contactRoster && this.contactRoster.length > 0) {
      const allMessages = this.chat.getMessagesForSession('USER-A', 'USER-B');
      const totalUnreadFromUserB = allMessages.filter(m => m.sender === 'USER-B').length;

      this.contactRoster.forEach(contact => {
        if (!this.activeTarget) {
          contact.unreadCount = totalUnreadFromUserB;
          contact.lastMessage = allMessages[allMessages.length - 1]?.text || contact.lastMessage;
        } else {
          contact.unreadCount = 0;
        }
      });
    }
  }

  selectTarget(name: string) { 
    this.chat.setPhoneTarget('A', 'USER-B'); 
    if (this.contactRoster) {
      this.contactRoster.forEach(c => c.unreadCount = 0);
    }
    setTimeout(() => { this.reloadHistory(); }, 50);
  }
  
  exitToRoster() { 
    this.chat.setPhoneTarget('A', ''); 
    this.calculateLocalUnreadBadges();
  }

  typeNotify(focus: boolean) { this.chat.setTyping('USER-A', 'USER-B', focus); }
  appendEmoji(emoji: string) { this.textDraft += emoji; this.showEmojis = false; }

  send() {
    if (!this.textDraft.trim()) return;
    this.chat.sendMessage('USER-A', 'USER-B', this.textDraft);
    this.textDraft = '';
  }

  removeMessage(id: string) { this.chat.deleteSingleMessage(id); }

  async activateHardwareCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.muted = true;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
          const canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 480;
          const context = canvas.getContext('2d');
          setTimeout(() => {
            if (context) {
              context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
              this.chat.sendMessage('USER-A', 'USER-B', '', 'image', canvas.toDataURL('image/jpeg'));
            }
            stream.getTracks().forEach(track => track.stop());
          }, 300);
        };
      }
    } catch (err) {
      alert("Permission Denied: Core browser context blocked camera stream.");
    }
  }

  uploadDeviceFile(event: any) {
    const targetFile = event.target.files[0];
    if (targetFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.chat.sendMessage('USER-A', 'USER-B', '', 'image', e.target.result);
      };
      reader.readAsDataURL(targetFile);
    }
  }

  openAddContactModal() { this.newContactName = ''; this.showAddModal = true; }
  saveContact() {
    if (this.newContactName.trim()) {
      this.chat.addNewContact('A', this.newContactName.trim());
      this.showAddModal = false;
    }
  }

  clearLogs() { this.chat.clearSessionHistory('USER-A', 'USER-B'); }
  deleteContact() { this.chat.deleteContactProfile('A', 'USER-B'); }
  private scrollToBottom() { try { this.scrollingView.nativeElement.scrollTop = this.scrollingView.nativeElement.scrollHeight; } catch {} }
  ngOnDestroy() { this.subs.unsubscribe(); }
}