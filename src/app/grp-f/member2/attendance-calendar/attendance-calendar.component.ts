import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css']
})
export class AttendanceCalendarComponent {

  selectedMember = '';
  selectedDate = '';

  currentMonth = new Date().getMonth();

  currentYear = new Date().getFullYear();
  calendarGrid: any[] = [];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  calendarDays: any[] = [];

  constructor() {

    this.loadSelectedMember();
    this.selectedDate =
  localStorage.getItem(
    'selectedDate'
  ) || '';

    this.loadAttendanceHistory();
    this.generateCalendarGrid();

    window.addEventListener(
      'memberSelected',
      () => {

        this.loadSelectedMember();

        this.loadAttendanceHistory();
          this.generateCalendarGrid();

      }
    );
    window.addEventListener(
  'dateSelected',
  () => {

    this.selectedDate =
      localStorage.getItem(
        'selectedDate'
      ) || '';

    this.generateCalendarGrid();

  }
);

  }

  loadSelectedMember() {

    this.selectedMember =
      localStorage.getItem(
        'selectedMember'
      ) || '';

  }

 previousMonth(){

  if(this.currentMonth === 0){

    this.currentMonth = 11;
    this.currentYear--;

  }

  else{

    this.currentMonth--;

  }

  this.loadAttendanceHistory();
  this.generateCalendarGrid();

}

 nextMonth(){

  if(this.currentMonth === 11){

    this.currentMonth = 0;
    this.currentYear++;

  }

  else{

    this.currentMonth++;

  }

  this.loadAttendanceHistory();
  this.generateCalendarGrid();

}

  loadAttendanceHistory() {

    this.calendarDays = [];

    if (!this.selectedMember) {
      return;
    }

    const month =
      (this.currentMonth + 1)
        .toString()
        .padStart(2, '0');

    for (let i = 1; i <= 31; i++) {

      const day =
        i.toString().padStart(2, '0');

      const date =
        `${this.currentYear}-${month}-${day}`;

      const savedData =
        localStorage.getItem(
          `attendance-${date}`
        );

      if (savedData) {

        const attendance =
          JSON.parse(savedData);

        const member =
          attendance.find(
            (m: any) =>
              m.name === this.selectedMember
          );

        if (member) {

          this.calendarDays.push({

            day: i,

            status:
              member.present
                ? 'present'
                : 'absent'

          });

        }

      }

    }

  }
  generateCalendarGrid() {

  this.calendarGrid = [];

  const daysInMonth =
    new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

  const firstDay =
    new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();

  for(let i=0;i<firstDay;i++){

    this.calendarGrid.push({
      empty:true
    });

  }

  for(let day=1;day<=daysInMonth;day++){

    const month =
      (this.currentMonth + 1)
      .toString()
      .padStart(2,'0');

    const fullDate =
      `${this.currentYear}-${month}-${day
      .toString()
      .padStart(2,'0')}`;

    this.calendarGrid.push({

      day,

      date:fullDate,

      status:
        this.getAttendanceStatus(
          fullDate
        ),
        locked:
    this.isLockedDate(
      fullDate
    ),

      future:
        new Date(fullDate)
        >
        new Date()

    });

  }

}
getAttendanceStatus(date:string){

  const data =
    localStorage.getItem(
      `attendance-${date}`
    );

  if(!data){

    return 'no-record';

  }

  const attendance =
    JSON.parse(data);

  const member =
    attendance.find(
      (m:any)=>
      m.name===this.selectedMember
    );

  if(!member){

    return 'no-record';

  }

  return member.present
    ? 'present'
    : 'absent';

}
selectDate(date: string) {

  const clickedDate =
    new Date(date);

  const today =
    new Date();

  today.setHours(
    0,0,0,0
  );

  if(clickedDate > today){

    return;

  }

  this.selectedDate = date;

  localStorage.setItem(
    'selectedDate',
    date
  );

  window.dispatchEvent(
    new Event('dateSelected')
  );

}
isLockedDate(date:string){

  const lockedDates =

    JSON.parse(

      localStorage.getItem(
        'lockedDates'
      ) || '[]'

    );

  return lockedDates.includes(
    date
  );

}

}