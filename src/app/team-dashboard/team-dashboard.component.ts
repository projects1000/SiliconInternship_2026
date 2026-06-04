import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Student {
  name: string;
}

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent {
  constructor(private router: Router) { }

  groups: { [key: string]: Student[] } = {

    A: [
      { name: 'Soumyajit Jena' },
      { name: 'Swagat Das' },
      { name: 'Samikshya Samadarshini' },
      { name: 'Archana Devi' },
      { name: 'Roshan Mishra' },
      { name: 'Satyabrata Sarangi' },
      { name: 'Priyanshu Sekhar' },
      { name: 'Ankit Prasad' },
      { name: 'Ronit Kumar Swain' }
    ],



    B: [
      { name: 'Jagannath Padhi' },
      { name: 'Rohan Kumar Nayak' },
      { name: 'Tushar Ranjan Muduli' },
      { name: 'Snehasis Das' },
      { name: 'Omkar Sahoo' },
      { name: 'Motilal Turuk' }
    ],


    C: [
      { name: 'Gayatri Pati' },
      { name: 'Gaurav Patra' },
      { name: 'Ayush Guharay' },
      { name: 'Anup Mohanty' },
      { name: 'Adil Khan' },
      { name: 'Anurag Mohanty' },
      { name: 'Debashis Tripathy' },
      { name: 'Safaq Jamal' },
      { name: 'Sohan Mohanty' },
      { name: 'Hrushikesh Pattnaik' }
    ],
    D: [
      { name: 'Chandan Kumar Sahu' },
      { name: 'Sitikantha Dalai' },
      { name: 'Titiksha Sahu' },
      { name: 'Anjali Sahoo' },
      { name: 'Sushree Sangita Sethi' },
      { name: 'Mama Bisoi' },
      { name: 'Tanmaya Sahu' },
      { name: 'Pratik Parag Pani' },
      { name: 'Ranit Kumar Das' },
      { name: 'Shobha Kumari' },
      { name: 'CS Vishal Rout' }
    ],
    E: [
      { name: 'Rajesh Behera' },
      { name: 'Maniketa Padhan' },
      { name: 'Jeevan Jyoti Panigrahi' },
      { name: 'Ayush Mishra' },
      { name: 'Mohit Singal' },
      { name: 'Dhiraj Mahapatra' },
      { name: 'Swayam Sahu' },
      { name: 'Subhashree Mohapatra' },
      { name: 'Subhalaxmi Sahoo' }
    ],


    F: [
      { name: 'Rajshree Panda' },
      { name: 'Soumyashree Panda' },
      { name: 'Rupali Jena' },
      { name: 'Lipsa Panda' },
      { name: 'Shrestha Mohanty' },
      { name: 'Sukanya Subhadarshini' },
      { name: 'Anjali Mishra' },
      { name: 'Prachi Pratyasha Das' },
      { name: 'Nirmit Nayak' },
      { name: 'Padmalaya Meher' }
    ],


    G: [
      { name: 'Shubham Kumar' },
      { name: 'Yash Kumar' },
      { name: 'Sasawat Rout' },
      { name: 'Adarsh Kumar' },
      { name: 'Amit Kumar Yash' },
      { name: 'C H Tanisha' },
      { name: 'Pratikshya Acharya' },
      { name: 'Mahesh Dukua' },
      { name: 'Anil Kumar Nayak' },
      { name: 'Khushi Sahu' }
    ]
  };

  selectedGroup: string = '';
  students: Student[] = [];

  selectedStudent: Student | null = null;

  showGroup(group: string): void {
    this.selectedGroup = group;
    this.students = this.groups[group] || [];
    this.selectedStudent = null;
  }

  selectStudent(student: Student): void {
    if (this.selectedGroup === 'E' && student.name === 'Swayam Sahu') {
      this.router.navigate(['/group-e/swayam-sahu']);
      return;
    }

    this.selectedStudent = student;
  }
}
