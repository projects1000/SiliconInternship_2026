import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  attendanceHistory: any[] = [];

  totalReports = 0;

  averageAttendance = 0;

  bestGroup = '-';

  ngOnInit() {

    this.loadHistory();

  }

  loadHistory() {

    const savedHistory =
      localStorage.getItem('attendanceHistory');

    if (savedHistory) {

      this.attendanceHistory =
        JSON.parse(savedHistory);

      this.calculateAnalytics();

      setTimeout(() => {

        this.createChart();

      }, 200);

    }

  }

  generateAllReports() {

    const attendanceData =
      JSON.parse(
        localStorage.getItem('attendanceData') || '{}'
      );

    const reports: any[] = [];

    Object.keys(attendanceData).forEach((group: any) => {

      const students =
        attendanceData[group];

      const present =
        students.filter(
          (student: any) => student.present
        ).length;

      const absent =
        students.length - present;

      const percentage =
        students.length > 0
          ? Math.round(
              (present / students.length) * 100
            )
          : 0;

      reports.push({

        date: new Date().toLocaleString(
          'en-IN',
          {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }
        ),

        group: group,

        present: present,

        absent: absent,

        percentage: percentage

      });

    });

    localStorage.setItem(
      'attendanceHistory',
      JSON.stringify(reports)
    );

    this.attendanceHistory = reports;

    this.calculateAnalytics();

    setTimeout(() => {

      this.createChart();

    }, 200);

    alert('All Group Reports Generated');

  }

  createChart() {

    const canvas: any =
      document.getElementById('attendanceChart');

    if (!canvas) {
      return;
    }

    new Chart(canvas, {

      type: 'bar',

      data: {

        labels: this.attendanceHistory.map(
          report => report.group
        ),

        datasets: [

          {

            label: 'Attendance %',

            data: this.attendanceHistory.map(
              report => report.percentage
            )

          }

        ]

      }

    });

  }

  calculateAnalytics() {

    this.totalReports =
      this.attendanceHistory.length;

    if (this.attendanceHistory.length === 0) {

      this.averageAttendance = 0;

      this.bestGroup = '-';

      return;

    }

    let totalPercentage = 0;

    let bestPercentage = 0;

    let bestGroupName = '-';

    this.attendanceHistory.forEach(report => {

      totalPercentage += report.percentage;

      if (report.percentage > bestPercentage) {

        bestPercentage = report.percentage;

        bestGroupName = report.group;

      }

    });

    this.averageAttendance = Math.round(
      totalPercentage /
      this.attendanceHistory.length
    );

    this.bestGroup = bestGroupName;

  }

  clearHistory() {

    const confirmDelete =
      confirm('Clear all attendance history?');

    if (!confirmDelete) {
      return;
    }

    localStorage.removeItem('attendanceHistory');

    this.attendanceHistory = [];

    this.calculateAnalytics();

  }

  downloadPdf() {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      'Attendance Report',
      14,
      20
    );

    autoTable(doc, {

      head: [[
        'Date',
        'Group',
        'Present',
        'Absent',
        'Attendance %'
      ]],

      body: this.attendanceHistory.map(report => [

        report.date,
        report.group,
        report.present,
        report.absent,
        report.percentage + '%'

      ])

    });

    doc.save('Attendance_Report.pdf');

  }

}