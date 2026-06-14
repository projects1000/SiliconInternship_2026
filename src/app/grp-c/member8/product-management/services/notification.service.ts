import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSource =
    new Subject<string>();

  messages$ =
    this.messageSource.asObservable();

  constructor(
    private snackBar: MatSnackBar
  ) {}

  show(message: string) {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 2000
      }
    );

    this.messageSource.next(message);
  }
}