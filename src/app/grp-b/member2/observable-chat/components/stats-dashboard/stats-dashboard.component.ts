import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ChatStatistics } from '../../models/chat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css']
})
export class StatsDashboardComponent implements OnInit, OnDestroy {
  stats: ChatStatistics = {
    totalMessages: 0,
    filesShared: 0,
    imagesShared: 0,
    lastMessage: null,
    activeSubscribers: 0
  };

  private statsSub!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.statsSub = this.chatService.stats$.subscribe(s => {
      this.stats = s;
    });
  }

  ngOnDestroy() {
    if (this.statsSub) this.statsSub.unsubscribe();
  }
}
