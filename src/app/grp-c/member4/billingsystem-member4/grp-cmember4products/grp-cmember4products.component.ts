import { Component } from '@angular/core';

@Component({
  selector: 'app-grp-cmember4products',
  templateUrl: './grp-cmember4products.component.html',
  styleUrls: ['./grp-cmember4products.component.css']
})
export class GrpCmember4productsComponent {
  activepage:string='';

getCategoryColor() {

  switch (this.activepage) {

    case 'Coffee':
      return '#6f4e37';

    case 'Drinks':
      return '#2563eb';

    case 'Pizza':
      return '#f97316';

    case 'Burger':
      return '#dc2626';

    case 'Fries':
      return '#eab308';

    case 'Sandwich':
      return '#65a30d';

    case 'Pasta':
      return '#d97706';

    case 'Cake':
      return '#ec4899';

    default:
      return '#2563eb';
  }
}
}
