import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.css']
})
export class AttendanceHistoryComponent implements OnInit {

  attendanceHistory: any[] = [];
  memberSearch: string = '';
  filteredHistory: any[] = [];
  activeTab: 'student' | 'group' | 'report' = 'student';
  reportType: 'yearly' | 'monthly' | 'weekly' = 'monthly';
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  selectedWeekStart: string = '';
  
  // Group selection properties
  availableGroups: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  selectedGroup: string = 'A';
  groupAttendanceHistory: any[] = [];
  // mapping of group -> member names (kept in sync with attendance-table initial data)
  groups: { [key: string]: string[] } = {
    A: ['Soyngsruti Jena','Swagat Das','Samikshya Samadarshini','Archana Devi','Roshan Mishra','Satyabrat Sarangi','Priyanshu Sekhar','Ankit Prasad','Ronit Kumar Swain'],
    B: ['Jagannath Padhi','Rohan Kumar Nayak','Tushar Ranjan Muduli','Snehasis Das','Omkar Sahoo','Motilal Turuk'],
    C: ['Gayatri Pati','Gaurav Patra','Ayush Guharay','Anup Mohanty','Adil Khan','Anurag Mohanty','Debashis Tripathy','Safaq Jamal','Sohan Mohanty','Hrushikesh Pattnaik'],
    D: ['Chandan Kumar Sahu','Sitikantha Dalal','Titiksha Sahu','Anjali Sahoo','Sushree Sangita Sethi','Mama Bisoi','Tanmay Sahu','Pratik Parag Pani','Ranit Das','Shobha Kumari','CS Vishal Rout'],
    E: ['Rajesh Behera','Maniket Padhan','Jeevan Jyoti Panigrahi','Ayush Mishra','Mohit Singal','Dhiraj Mahapatra','Swayam Sahu','Subhashree Mohapatra','Subhalaxmi Sahoo'],
    F: ['Rajshree Panda','Soumyashree Panda','Rupali Jena','Lipsa Panda','Shrestha Mohanty','Sukanya Subhadarshini','Anjali Mishra','Prachi Pratyasha Das','Nirmit Nayak','Padmalaya Meher'],
    G: ['Shubham Kumar','Yash Kumar','Sasawat Rout','Adarsh Kumar','Amit Kumar Yash','C H Tanisha','Pratikshya Acharya','Mahesh Dakua','Anil Kumar Nayak','Khushisahu','Swarna Sharma']
  };
  groupReport: any = {
    present: 0,
    absent: 0,
    totalDays: 0,
    presentPercentage: 0,
    absentPercentage: 0
  };
  
  studentReport: { [key: string]: any } = {};
  monthlyReport: any[] = [];
  weeklyReport: any[] = [];
  yearlyReport: any[] = [];

  constructor() {
    this.loadAttendanceData();
  }

  ngOnInit(): void {
    this.calculateReports();
    this.onGroupChange();
  }

  onGroupChange(): void {
    // Filter attendance history based on selected group
    const groupNames = this.groups[this.selectedGroup] || [];

    this.groupAttendanceHistory = this.attendanceHistory.map(record => ({
      ...record,
      present: record.present.filter((m: any) => groupNames.includes(m.name)),
      absent: record.absent.filter((m: any) => groupNames.includes(m.name))
    })).filter(record => record.present.length > 0 || record.absent.length > 0);

    this.calculateGroupReportForSelected();
    this.calculateWeeklyReport();
  }

  calculateReports(): void {
    this.calculateStudentReport();
    this.calculateMonthlyReport();
    this.calculateWeeklyReport();
    this.calculateYearlyReport();
  }

  calculateGroupReportForSelected(): void {
    let totalPresent = 0;
    let totalAbsent = 0;

    this.groupAttendanceHistory.forEach(record => {
      totalPresent += record.present.length;
      totalAbsent += record.absent.length;
    });

    const total = totalPresent + totalAbsent;
    this.groupReport = {
      present: totalPresent,
      absent: totalAbsent,
      totalDays: this.groupAttendanceHistory.length,
      presentPercentage: total > 0 ? ((totalPresent / total) * 100).toFixed(2) : 0,
      absentPercentage: total > 0 ? ((totalAbsent / total) * 100).toFixed(2) : 0
    };
  }

  calculateGroupReport(): void {
    let totalPresent = 0;
    let totalAbsent = 0;

    this.attendanceHistory.forEach(record => {
      totalPresent += record.present.length;
      totalAbsent += record.absent.length;
    });

    const total = totalPresent + totalAbsent;
    this.groupReport = {
      present: totalPresent,
      absent: totalAbsent,
      totalDays: this.attendanceHistory.length,
      presentPercentage: total > 0 ? ((totalPresent / total) * 100).toFixed(2) : 0,
      absentPercentage: total > 0 ? ((totalAbsent / total) * 100).toFixed(2) : 0
    };
  }

  loadAttendanceData(): void {
    const lockedDates = JSON.parse(localStorage.getItem('lockedDates') || '[]');

    lockedDates.forEach((date: string) => {
      const data = JSON.parse(localStorage.getItem(`attendance-${date}`) || '[]');
      
      const present = data.filter((m: any) => m.present);
      const absent = data.filter((m: any) => !m.present);

      this.attendanceHistory.push({
        date,
        present,
        absent
      });
    });

    this.filteredHistory = [...this.attendanceHistory];
  }

  filterByMember(): void {
    if (!this.memberSearch.trim()) {
      this.filteredHistory = [...this.attendanceHistory];
      return;
    }

    const search = this.memberSearch.toLowerCase();
    this.filteredHistory = this.attendanceHistory.map(record => ({
      ...record,
      present: record.present.filter((m: any) => m.name.toLowerCase().includes(search)),
      absent: record.absent.filter((m: any) => m.name.toLowerCase().includes(search))
    })).filter(record => record.present.length > 0 || record.absent.length > 0);
  }

  calculateStudentReport(): void {
    const studentMap = new Map<string, any>();

    this.attendanceHistory.forEach(record => {
      record.present.forEach((student: any) => {
        if (!studentMap.has(student.name)) {
          studentMap.set(student.name, { name: student.name, present: 0, absent: 0 });
        }
        studentMap.get(student.name).present++;
      });

      record.absent.forEach((student: any) => {
        if (!studentMap.has(student.name)) {
          studentMap.set(student.name, { name: student.name, present: 0, absent: 0 });
        }
        studentMap.get(student.name).absent++;
      });
    });

    this.studentReport = {};
    studentMap.forEach((value, key) => {
      const total = value.present + value.absent;
      this.studentReport[key] = {
        ...value,
        totalDays: total,
        percentage: total > 0 ? ((value.present / total) * 100).toFixed(2) : 0
      };
    });
  }

  calculateMonthlyReport(): void {
    const monthlyMap = new Map<string, any>();

    this.attendanceHistory.forEach(record => {
      const date = new Date(record.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { month: monthKey, present: 0, absent: 0, days: 0 });
      }

      const data = monthlyMap.get(monthKey);
      data.present += record.present.length;
      data.absent += record.absent.length;
      data.days = (data.present + data.absent) / (record.present.length + record.absent.length) || 1;
    });

    this.monthlyReport = Array.from(monthlyMap.values()).map(item => ({
      ...item,
      percentage: item.present + item.absent > 0 ? ((item.present / (item.present + item.absent)) * 100).toFixed(2) : 0
    }));
  }

  calculateWeeklyReport(): void {
    const source = (this.groupAttendanceHistory && this.groupAttendanceHistory.length) ? this.groupAttendanceHistory : this.attendanceHistory;
    const weeklyMap = new Map<string, any>();

    source.forEach(record => {
      const date = new Date(record.date);
      const weekStart = this.getWeekStart(date);
      const weekKey = weekStart.toISOString().split('T')[0];

      if (!weeklyMap.has(weekKey)) {
        weeklyMap.set(weekKey, { weekStart: weekKey, present: 0, absent: 0, members: new Map<string, any>() });
      }

      const data = weeklyMap.get(weekKey);
      data.present += record.present.length;
      data.absent += record.absent.length;

      // accumulate member-wise counts (works for filtered groupAttendanceHistory as well)
      record.present.forEach((p: any) => {
        const m = data.members.get(p.name) || { name: p.name, present: 0, absent: 0 };
        m.present += 1;
        data.members.set(p.name, m);
      });

      record.absent.forEach((a: any) => {
        const m = data.members.get(a.name) || { name: a.name, present: 0, absent: 0 };
        m.absent += 1;
        data.members.set(a.name, m);
      });
    });

    this.weeklyReport = Array.from(weeklyMap.values()).map(item => {
      const membersArr = Array.from(item.members.values()).map((m: any) => {
        const total = m.present + m.absent;
        return {
          name: m.name,
          present: m.present,
          absent: m.absent,
          total,
          percentage: total > 0 ? ((m.present / total) * 100).toFixed(2) : '0.00'
        };
      });

      return {
        weekStart: item.weekStart,
        present: item.present,
        absent: item.absent,
        percentage: item.present + item.absent > 0 ? ((item.present / (item.present + item.absent)) * 100).toFixed(2) : '0.00',
        members: membersArr
      };
    });
  }

  calculateYearlyReport(): void {
    const yearlyMap = new Map<string, any>();

    this.attendanceHistory.forEach(record => {
      const date = new Date(record.date);
      const year = date.getFullYear().toString();

      if (!yearlyMap.has(year)) {
        yearlyMap.set(year, { year, present: 0, absent: 0 });
      }

      const data = yearlyMap.get(year);
      data.present += record.present.length;
      data.absent += record.absent.length;
    });

    this.yearlyReport = Array.from(yearlyMap.values()).map(item => ({
      ...item,
      percentage: item.present + item.absent > 0 ? ((item.present / (item.present + item.absent)) * 100).toFixed(2) : 0
    }));
  }

  getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  exportToCSV(): void {
    let csv = 'Attendance Report\n\n';
    
    if (this.reportType === 'yearly') {
      csv += 'Yearly Report\n';
      csv += 'Year,Present,Absent,Percentage\n';
      this.yearlyReport.forEach(item => {
        csv += `${item.year},${item.present},${item.absent},${item.percentage}%\n`;
      });
    } else if (this.reportType === 'monthly') {
      csv += 'Monthly Report\n';
      csv += 'Month,Present,Absent,Percentage\n';
      this.monthlyReport.forEach(item => {
        csv += `${item.month},${item.present},${item.absent},${item.percentage}%\n`;
      });
    } else {
      csv += 'Weekly Report\n';
      csv += 'Week Start,Present,Absent,Percentage\n';
      this.weeklyReport.forEach(item => {
        csv += `${item.weekStart},${item.present},${item.absent},${item.percentage}%\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${this.reportType}-${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  downloadPDF(): void {
    let content = `
    <html>
      <head>
        <title>Attendance Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #071426; text-align: center; }
          h2 { color: #00d4ff; margin-top: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #071426; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Attendance Report</h1>
    `;

    if (this.reportType === 'yearly') {
      content += '<h2>Yearly Report</h2><table><tr><th>Year</th><th>Present</th><th>Absent</th><th>Percentage</th></tr>';
      this.yearlyReport.forEach(item => {
        content += `<tr><td>${item.year}</td><td>${item.present}</td><td>${item.absent}</td><td>${item.percentage}%</td></tr>`;
      });
    } else if (this.reportType === 'monthly') {
      content += '<h2>Monthly Report</h2><table><tr><th>Month</th><th>Present</th><th>Absent</th><th>Percentage</th></tr>';
      this.monthlyReport.forEach(item => {
        content += `<tr><td>${item.month}</td><td>${item.present}</td><td>${item.absent}</td><td>${item.percentage}%</td></tr>`;
      });
    } else {
      content += '<h2>Weekly Report</h2><table><tr><th>Week Start</th><th>Present</th><th>Absent</th><th>Percentage</th></tr>';
      this.weeklyReport.forEach(item => {
        content += `<tr><td>${item.weekStart}</td><td>${item.present}</td><td>${item.absent}</td><td>${item.percentage}%</td></tr>`;
      });
    }

    content += '</table></body></html>';

    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
  }

}