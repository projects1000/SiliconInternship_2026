import { Component } from '@angular/core';

@Component({
  selector: 'app-team-tree',
  templateUrl: './team-tree.component.html',
  styleUrls: ['./team-tree.component.css']
})
export class TeamTreeComponent {

  newStudent = '';

  students = [
    'Rupali Jena',
    'Ankit Kumar',
    'Priya Sharma',
    'Rahul Das'
  ];

  addStudent() {

    if(this.newStudent.trim()){

      this.students.push(this.newStudent);

      this.newStudent = '';
    }

  }

  deleteStudent(index:number){

    this.students.splice(index,1);

  }

}