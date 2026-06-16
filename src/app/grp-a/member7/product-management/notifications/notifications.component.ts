import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, NotificationMessage } from '../notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  messages: (NotificationMessage & { id: number })[] = [];
  private subscription!: Subscription;
  private counter = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.messages$.subscribe(
      (msg: NotificationMessage) => {
        this.messages.push({ ...msg, id: ++this.counter });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearAll(): void {
    this.messages = [];
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
