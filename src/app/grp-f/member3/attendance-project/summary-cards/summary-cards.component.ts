import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent {

  @Input() totalStudents = 0;

  @Input() presentCount = 0;

  @Input() absentCount = 0;

  @Input() attendancePercentage = 0;

}