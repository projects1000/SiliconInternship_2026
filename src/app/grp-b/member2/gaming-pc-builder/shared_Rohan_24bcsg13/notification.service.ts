// ============================================================
// notification.service.ts
// SHARED SERVICE COMMUNICATION using BehaviorSubject
// This service is shared between GamingPcBuilderComponent (parent)
// and NotificationPanelComponent (child).
// Changes here automatically reflect in the NotificationPanel
// without any @Input/@Output — demonstrates Shared Service pattern.
// ============================================================

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // ✅ BehaviorSubject holds the notification log
  // Any component that subscribes gets live updates
  private notificationsSubject = new BehaviorSubject<string[]>([]);

  // Public observable — components subscribe to this
  notifications$ = this.notificationsSubject.asObservable();

  // Push a new notification to the top of the list
  addNotification(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const current = this.notificationsSubject.getValue();
    const newEntry = `[${timestamp}] ${message}`;
    // Keep latest 20 notifications
    this.notificationsSubject.next([newEntry, ...current].slice(0, 20));
  }

  // Clear all notifications
  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }
}
