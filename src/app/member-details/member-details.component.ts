
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})

export class MemberDetailsComponent {

  @Input() member:any;

}