import { Component } from '@angular/core';

@Component({
  selector: 'app-member-tree',
  templateUrl: './member-tree.component.html',
  styleUrls: ['./member-tree.component.css']
})
export class MemberTreeComponent {
   searchText = '';
   selectedMember = '';

  groups = [

{
  name: 'Group A',
  expanded: false,
  members: [
    'Soyngsruti Jena',
    'Swagat Das',
    'Samikshya Samadarshini',
    'Archana Devi',
    'Roshan Mishra',
    'Satyabrat Sarangi',
    'Priyanshu Sekhar',
    'Ankit Prasad',
    'Ronit Kumar Swain'
  ]
},

{
  name: 'Group B',
  expanded: false,
  members: [
    'Jagannath Padhi',
    'Rohan Kumar Nayak',
    'Tushar Ranjan Muduli',
    'Snehasis Das',
    'Omkar Sahoo',
    'Motilal Turuk'
  ]
},

{
  name: 'Group C',
  expanded: false,
  members: [
    'Gayatri Pati',
    'Gaurav Patra',
    'Ayush Guharay',
    'Anup Mohanty',
    'Adil Khan',
    'Anurag Mohanty',
    'Debashis Tripathy',
    'Safaq Jamal',
    'Sohan Mohanty',
    'Hrushikesh Pattnaik'
  ]
},

{
  name: 'Group D',
  expanded: false,
  members: [
    'Chandan Kumar Sahu',
    'Sitikantha Dalal',
    'Titiksha Sahu',
    'Anjali Sahoo',
    'Sushree Sangita Sethi',
    'Mama Bisoi',
    'Tanmay Sahu',
    'Pratik Parag Pani',
    'Ranit Das',
    'Shobha Kumari',
    'CS Vishal Rout'
  ]
},

{
  name: 'Group E',
  expanded: false,
  members: [
    'Rajesh Behera',
    'Maniket Padhan',
    'Jeevan Jyoti Panigrahi',
    'Ayush Mishra',
    'Mohit Singal',
    'Dhiraj Mahapatra',
    'Swayam Sahu',
    'Subhashree Mohapatra',
    'Subhalaxmi Sahoo'
  ]
},

{
  name: 'Group F',
  expanded: false,
  members: [
    'Rajshree Panda',
    'Soumyashree Panda',
    'Rupali Jena',
    'Lipsa Panda',
    'Shrestha Mohanty',
    'Sukanya Subhadarshini',
    'Anjali Mishra',
    'Prachi Pratyasha Das',
    'Nirmit Nayak',
    'Padmalaya Meher'
  ]
},

{
  name: 'Group G',
  expanded: false,
  members: [
    'Shubham Kumar',
    'Yash Kumar',
    'Sasawat Rout',
    'Adarsh Kumar',
    'Amit Kumar Yash',
    'C H Tanisha',
    'Pratikshya Acharya',
    'Mahesh Dakua',
    'Anil Kumar Nayak',
    'Khushisahu',
    'Swarna Sharma'
  ]
}

];

  toggleGroup(group: any) {
    group.expanded = !group.expanded;
  }
   filterMembers(members: string[]) {

    if (!this.searchText) {
      return members;
    }

    return members.filter(member =>
      member.toLowerCase()
        .includes(this.searchText.toLowerCase())
    );

  }
  hasMatchingMembers(group: any): boolean {

  if (!this.searchText) {
    return true;
  }

  const found = group.members.some((member: string) =>
    member.toLowerCase()
      .includes(this.searchText.toLowerCase())
  );

  if (found) {
    group.expanded = true;
  }

  return found;
}
selectMember(member: string) {

  this.selectedMember = member;

  localStorage.setItem(
    'selectedMember',
    member
  );

  window.dispatchEvent(
    new Event('memberSelected')
  );

}
}
