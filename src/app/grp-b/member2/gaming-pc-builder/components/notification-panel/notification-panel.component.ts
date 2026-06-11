// ============================================================
// notification-panel.component.ts
// Child component — subscribes to NotificationService
// Demonstrates: Shared Service Communication via BehaviorSubject
// This component does NOT use @Input or @Output to get data —
// it subscribes directly to the shared NotificationService.
// ============================================================

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../shared_Rohan_24bcsg13/notification.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit, OnDestroy {

  // ✅ Holds the notifications array from BehaviorSubject
  notifications: string[] = [];

  private sub!: Subscription;

  constructor(
    // ✅ Shared Service injected here — demonstrates Service Communication
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // ✅ Subscribe to BehaviorSubject observable
    // Whenever any component pushes a notification, this updates automatically
    this.sub = this.notificationService.notifications$.subscribe(
      (notes: string[]) => {
        this.notifications = notes;
      }
    );
  }

  onClearAll(): void {
    this.notificationService.clearNotifications();
  }

  ngOnDestroy(): void {
    // Cleanup subscription to prevent memory leaks
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
