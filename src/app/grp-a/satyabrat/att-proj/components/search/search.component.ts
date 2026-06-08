import { Component } from '@angular/core';
import { AttendanceStore, Member } from '../../utils/attendance.store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  members: Member[] = AttendanceStore.getData().members;
  selectedMemberId: string = '';
  report: string[] = [];

  generateReport() {
    if (!this.selectedMemberId) return;

    const data = AttendanceStore.getData();
    // Filter attendance for the selected member where status is true
    this.report = data.attendance
      .filter(a => a.memberId === this.selectedMemberId && a.status === true)
      .map(a => a.date)
      .sort();
  }
}