import { Component, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team-tree',
  templateUrl: './team-tree.component.html',
  styleUrls: ['./team-tree.component.css']
})
export class TeamTreeComponent {

  @Output()
  groupSelected = new EventEmitter<string>();

  groups = [
    'Group A',
    'Group B',
    'Group C',
    'Group D',
    'Group E',
    'Group F'
  ];

  selectedGroup = 'Group A';

  selectGroup(group: string) {
    this.selectedGroup = group;
    this.groupSelected.emit(group);
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