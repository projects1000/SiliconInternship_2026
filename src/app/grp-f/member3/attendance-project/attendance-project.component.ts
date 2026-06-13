import { Component, ViewChild } from '@angular/core';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';

@Component({
  selector: 'app-attendance-project',
  templateUrl: './attendance-project.component.html',
  styleUrls: ['./attendance-project.component.css']
})
export class AttendanceProjectComponent {
  @ViewChild(AttendanceTableComponent)
attendanceTable!: AttendanceTableComponent;

  selectedGroup = 'Group A';

  presentCount = 0;

  absentCount = 0;

  attendancePercentage = 0;
  totalStudents = 0;

  newMemberName = '';

  selectedGroupForAdd = 'Group A';

  onGroupSelected(group: string) {

    this.selectedGroup = group;

  }

 onAttendanceSaved(data: any) {

  this.totalStudents = data.totalStudents;

  this.presentCount = data.presentCount;

  this.absentCount = data.absentCount;

  this.attendancePercentage = data.attendancePercentage;

}

addMember() {

  if (!this.newMemberName.trim()) {

    alert('Please enter a member name');

    return;

  }

  this.attendanceTable.addStudentToGroup(
    this.selectedGroupForAdd,
    this.newMemberName
  );

  alert(
    `${this.newMemberName} added to ${this.selectedGroupForAdd}`
  );

  this.newMemberName = '';

}
}