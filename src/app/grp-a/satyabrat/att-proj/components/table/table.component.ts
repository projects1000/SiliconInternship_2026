import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceStore, Member, AttendanceRecord } from '../../utils/attendance.store';

export interface TableRow {
  memberId: string;
  name: string;
  status: boolean;
  locked: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'attendance', 'lock'];
  dataSource = new MatTableDataSource<TableRow>();
  
  selectedDate: Date = new Date();
  maxDate: Date = new Date(); 
  
  isDayLocked: boolean = false;

  constructor() {}

 ngOnInit(): void {
    this.loadTableData();
    
    // ADD THIS: Define how the filter should behave
    this.dataSource.filterPredicate = (data: TableRow, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };
    
    window.addEventListener('attendanceDataUpdated', () => {
      this.loadTableData();
    });
  }

  getFormattedDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  
  onDateChange(event: any): void {
    if (event.value) {
      this.selectedDate = event.value;
      this.loadTableData();
    }
  }

  loadTableData(): void {
    const data = AttendanceStore.getData();
    const dateStr = this.getFormattedDate(this.selectedDate);
    
    const dayRecords = data.attendance.filter(a => a.date === dateStr);
    
    this.isDayLocked = dayRecords.length > 0 && dayRecords.every(r => r.locked);

    const rows: TableRow[] = data.members.map(member => {
      const existingRecord = dayRecords.find(r => r.memberId === member.id);
      return {
        memberId: member.id,
        name: member.name,
        status: existingRecord ? existingRecord.status : false,
        locked: existingRecord ? existingRecord.locked : false
      };
    });

    this.dataSource.data = rows;
  }

  toggleAttendance(row: TableRow): void {
    if (row.locked || this.isDayLocked) return;
    
    row.status = !row.status;
    this.saveRecordToStore(row);
  }

  saveRecordToStore(row: TableRow): void {
    const data = AttendanceStore.getData();
    const dateStr = this.getFormattedDate(this.selectedDate);
    
    const recordIndex = data.attendance.findIndex(a => a.memberId === row.memberId && a.date === dateStr);
    
    if (recordIndex > -1) {
      data.attendance[recordIndex].status = row.status;
      data.attendance[recordIndex].locked = row.locked;
    } else {
      data.attendance.push({
        memberId: row.memberId,
        date: dateStr,
        status: row.status,
        locked: row.locked
      });
    }
    
    AttendanceStore.saveData(data);
  }
  lockDay(): void {
    // Add confirmation
    const confirmed = confirm("Are you sure you want to lock attendance for this date? This action cannot be undone.");
    
    if (confirmed) {
      this.isDayLocked = true;
      const rows = this.dataSource.data;
      rows.forEach(row => {
        row.locked = true;
        this.saveRecordToStore(row);
      });
      this.loadTableData();
    }
  }

  // Add this method to TableComponent class
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}