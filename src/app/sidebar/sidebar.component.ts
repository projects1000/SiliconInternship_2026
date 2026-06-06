import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

  @Input() teams:any;

  @Output() memberSelected = new EventEmitter<any>();

  openedTeam:string = '';

  toggleTeam(teamName:string){

    if(this.openedTeam === teamName){
      this.openedTeam = '';
    }
    else{
      this.openedTeam = teamName;
    }

  }

  selectMember(member:any){
    this.memberSelected.emit(member);
  }

}