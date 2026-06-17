import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserAComponent } from './components/user-a/user-a.component';
import { UserBComponent } from './components/user-b/user-b.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { StatsDashboardComponent } from './components/stats-dashboard/stats-dashboard.component';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-observable-chat',
  standalone: true,
  imports: [
    CommonModule,
    UserAComponent,
    UserBComponent,
    ChatWindowComponent,
    StatsDashboardComponent
  ],
  templateUrl: './observable-chat.component.html',
  styleUrls: ['./observable-chat.component.css']
})
export class ObservableChatComponent implements OnInit {
  isDarkMode = true;

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}

  goBack() {
    this.router.navigate(['/grp-b/member2']);
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('chat-theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('chat-theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

private applyTheme() {
  const root = document.documentElement;

  if (this.isDarkMode) {
    root.classList.add('glass-dark');
    root.classList.remove('glass-light');
  } else {
    root.classList.add('glass-light');
    root.classList.remove('glass-dark');
  }
}
}
