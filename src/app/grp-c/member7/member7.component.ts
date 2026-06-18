import { Component, OnInit } from '@angular/core';

interface AttendanceRecords {
  [dateKey: string]: boolean; // Maps a date like '07 Jun' to true (Present) or false (Absent)
}

interface Student {
  name: string;
  team: string;
  attendance: AttendanceRecords;
}

interface TeamNavigationItem {
  name: string;
  expanded: boolean;
  members: string[];
}

@Component({
  selector: 'app-member7',
  templateUrl: './member7.component.html',
  styleUrls: ['./member7.component.css']
})
export class Member7Component implements OnInit {
  imageUrl: string | ArrayBuffer | null = null;
  isAttendanceView: boolean = false;
  
  // Dashboard Metrics and Filtering States
  selectedDateText: string = '07 Jun'; 
  systemStatus: string = 'Editable';
  searchText: string = '';
  selectedTeam: string = 'All'; // Defaults to show all students until a specific team is selected

  // Array to drive the dropdown template columns inside the main table
  dateColumns: string[] = ['05 Jun', '06 Jun', '07 Jun', '08 Jun', '09 Jun'];

  // Sidebar Teams Explorer list definition matching your exact layout structural data
  teamsList: TeamNavigationItem[] = [
    {
      name: 'Team A',
      expanded: true,
      members: ['Soyngsruti Jena', 'Swagat Das', 'Samikshya Samadarshini', 'Archana Devi', 'Roshan Mishra', 'Satyabrat Sarangi', 'Priyanshu Sekhar', 'Ankit Prasad', 'Ronit Kumar Swain']
    },
    {
      name: 'Team B',
      expanded: false,
      members: ['Jagannath Padhi', 'Rohan Kumar Nayak', 'Tushar Ranjan Muduli', 'Snehasis Das', 'Omkar Sahoo', 'Motilal Turuk']
    },
    {
      name: 'Team C',
      expanded: false,
      members: ['Gayatri Pati', 'Gaurav Patra', 'Ayush Guharay', 'Anup Mohanty', 'Adil Khan', 'Anurag Mohanty', 'Debashis Tripathy', 'Safaq Jamal', 'Sohan Mohanty', 'Hrushikesh Pattnaik']
    },
    {
      name: 'Team D',
      expanded: false,
      members: ['Chandan Kumar Sahu', 'Sitikantha Dalal', 'Titiksha Sahu', 'Anjali Sahoo', 'Sushree Sangita Sethi', 'Mama Bisoi', 'Tanmay Sahu', 'Pratik Parag Pani', 'Ranit Das', 'Shobha Kumari', 'CS Vishal Rout']
    },
    {
      name: 'Team E',
      expanded: false,
      members: ['Rajesh Behera', 'Maniket Padhan', 'Jeevan Jyoti Panigrahi', 'Ayush Mishra', 'Mohit Singal', 'Dhiraj Mahapatra', 'Swayam Sahu', 'Subhashree Mohapatra', 'Subhalaxmi Sahoo']
    },
    {
      name: 'Team F',
      expanded: false,
      members: ['Rajshree Panda', 'Soumyashree Panda', 'Rupali Jena', 'Lipsa Panda', 'Shreshtha Mohanty', 'Sukanya Subhadarshini', 'Anjali Mishra', 'Prachi Pratyasha Das', 'Nirmit Nayak', 'Padmalaya Meher']
    },
    {
      name: 'Team G',
      expanded: false,
      members: ['Shubham Kumar', 'Yash Kumar', 'Sasawat Rout', 'Adarsh Kumar', 'Amit Kumar Yash', 'C H Tanisha', 'Pratikshya Acharya', 'Mahesh Dakua', 'Anil Kumar Nayak', 'Khushi Sahu']
    }
  ];

  // Complete clean synchronized layout database
  students: Student[] = [
    // Team A
    { name: 'Soyngsruti Jena', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': true, '08 Jun': false, '09 Jun': false } },
    { name: 'Swagat Das', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Samikshya Samadarshini', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Archana Devi', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Roshan Mishra', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Satyabrat Sarangi', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Priyanshu Sekhar', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Ankit Prasad', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Ronit Kumar Swain', team: 'Team A', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },

    // Team B
    { name: 'Jagannath Padhi', team: 'Team B', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Rohan Kumar Nayak', team: 'Team B', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Tushar Ranjan Muduli', team: 'Team B', attendance: { '05 Jun': false, '06 Jun': true, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Snehasis Das', team: 'Team B', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Omkar Sahoo', team: 'Team B', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Motilal Turuk', team: 'Team B', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },

    // Team C
    { name: 'Gayatri Pati', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Gaurav Patra', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Ayush Guharay', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Anup Mohanty', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Adil Khan', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Anurag Mohanty', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Debashis Tripathy', team: 'Team C', attendance: { '05 Jun': true, '06 Jun': true, '07 Jun': true, '08 Jun': true, '09 Jun': true } },
    { name: 'Safaq Jamal', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Sohan Mohanty', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Hrushikesh Pattnaik', team: 'Team C', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },

    // Team D
    { name: 'Chandan Kumar Sahu', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Sitikantha Dalal', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Titiksha Sahu', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Anjali Sahoo', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Sushree Sangita Sethi', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Mama Bisoi', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Tanmay Sahu', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Pratik Parag Pani', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Ranit Das', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Shobha Kumari', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'CS Vishal Rout', team: 'Team D', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },

    // Team E
    { name: 'Rajesh Behera', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Maniket Padhan', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Jeevan Jyoti Panigrahi', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Ayush Mishra', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Mohit Singal', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Dhiraj Mahapatra', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Swayam Sahu', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Subhashree Mohapatra', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Subhalaxmi Sahoo', team: 'Team E', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },

    // Team F
    { name: 'Rajshree Panda', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Soumyashree Panda', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Rupali Jena', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Lipsa Panda', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Shreshtha Mohanty', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Sukanya Subhadarshini', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Anjali Mishra', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Prachi Pratyasha Das', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Nirmit Nayak', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Padmalaya Meher', team: 'Team F', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },

    // Team G
    { name: 'Shubham Kumar', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Yash Kumar', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Sasawat Rout', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Adarsh Kumar', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Amit Kumar Yash', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'C H Tanisha', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Pratikshya Acharya', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Mahesh Dakua', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Anil Kumar Nayak', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } },
    { name: 'Khushi Sahu', team: 'Team G', attendance: { '05 Jun': false, '06 Jun': false, '07 Jun': false, '08 Jun': false, '09 Jun': false } }
  ];

  constructor() { }

  ngOnInit(): void {
    this.isAttendanceView = window.location.href.includes('attendance');
  }

  // Toggles active selection segment block in your sidebar panel drawer
  selectFilterTeam(teamName: string): void {
    this.selectedTeam = this.selectedTeam === teamName ? 'All' : teamName;
  }

  // Updates active grid checking date
  selectActiveCalendarDate(date: string): void {
    this.selectedDateText = date;
  }

  // Combined team-filter and text search filtering getter
  get filteredStudents(): Student[] {
    let result = this.students;

    if (this.selectedTeam !== 'All') {
      result = result.filter(student => student.team === this.selectedTeam);
    }

    if (this.searchText.trim()) {
      const query = this.searchText.toLowerCase();
      result = result.filter(student => student.name.toLowerCase().includes(query));
    }

    return result;
  }

  // Counts dynamic active checks across the entire grid layout panel
  get totalRecordsVisibleCount(): number {
    let count = 0;
    this.filteredStudents.forEach(s => {
      Object.keys(s.attendance).forEach(date => {
        if (s.attendance[date] === true) {
          count++;
        }
      });
    });
    return count;
  }

  removeStudent(index: number): void {
    // Finds matching element on full source dataset array when dealing with sliced sub-views
    const targetStudent = this.filteredStudents[index];
    const sourceIndex = this.students.findIndex(s => s.name === targetStudent.name);
    if (sourceIndex !== -1) {
      this.students.splice(sourceIndex, 1);
    }
  }

  saveAttendanceData(): void {
    alert(`Attendance data successfully updated and saved for date column context: ${this.selectedDateText}`);
  }

  lockRecordsToggle(): void {
    this.systemStatus = this.systemStatus === 'Editable' ? 'Locked' : 'Editable';
  }

  resetSearchFilters(): void {
    this.searchText = '';
    this.selectedTeam = 'All';
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  goBackToGroup() {
    window.history.back();
  }
}