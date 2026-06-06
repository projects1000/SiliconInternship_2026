import { Component } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})

export class PortalComponent {

  selectedMember:any;

  teams = {

    'Team A': [
      {
        name: 'Soyngsuti Jena',
        role: 'Frontend Developer',
        email: 'soyngsuti@gmail.com',
        phone: '9000000001',
        team: 'Team A'
        
      },
      {
        name: 'Swagat Das',
        role: 'UI Designer',
        email: 'swagat@gmail.com',
        phone: '9000000002',
        team: 'Team A'
      
      },
      {
        name: 'Samikshya Samadarshini',
        role: 'Angular Developer',
        email: 'samikshya@gmail.com',
        phone: '9000000003',
        team: 'Team A'
      
      },
      {
        name: 'Archana Devi',
        role: 'Backend Developer',
        email: 'archana@gmail.com',
        phone: '9000000004',
        team: 'Team A'
    
      },
      {
        name: 'Roshan Mishra',
        role: 'Java Developer',
        email: 'roshan@gmail.com',
        phone: '9000000005',
        team: 'Team A'
        
      },
      {
        name: 'Satyabrat Sarangi',
        role: 'Full Stack Developer',
        email: 'satyabrat@gmail.com',
        phone: '9000000006',
        team: 'Team A'

      },
      {
        name: 'Priyanshu Sekhar',
        role: 'Software Engineer',
        email: 'priyanshu@gmail.com',
        phone: '9000000007',
        team: 'Team A'
        
      },
      {
        name: 'Ankit Prasad',
        role: 'Frontend Developer',
        email: 'ankit@gmail.com',
        phone: '9000000008',
        team: 'Team A'
        
      },
      {
        name: 'Ronit Kumar Swain',
        role: 'Backend Developer',
        email: 'ronit@gmail.com',
        phone: '9000000009',
        team: 'Team A'
    
      }
    ],

    'Team B': [
      {
        name: 'Jagannath Padhi',
        role: 'Angular Developer',
        email: 'jagannath@gmail.com',
        phone: '9000000010',
        team: 'Team B'
      
      },
      {
        name: 'Rohan Kumar Nayak',
        role: 'UI Designer',
        email: 'rohan@gmail.com',
        phone: '9000000011',
        team: 'Team B'
      
      },
      {
        name: 'Tushar Ranjan Muduli',
        role: 'Frontend Developer',
        email: 'tushar@gmail.com',
        phone: '9000000012',
        team: 'Team B'
      
      },
      {
        name: 'Snehasis Das',
        role: 'Software Engineer',
        email: 'snehasis@gmail.com',
        phone: '9000000013',
        team: 'Team B'
      
      },
      {
        name: 'Omkar Sahoo',
        role: 'Backend Developer',
        email: 'omkar@gmail.com',
        phone: '9000000014',
        team: 'Team B'
      
      },
      {
        name: 'Motilal Turuk',
        role: 'Java Developer',
        email: 'motilal@gmail.com',
        phone: '9000000015',
        team: 'Team B'
        
      }
    ],

    'Team C': [
      {
        name: 'Gayatri Pati',
        role: 'Frontend Developer',
        email: 'gayatri@gmail.com',
        phone: '9000000016',
        team: 'Team C'
      
      },
      {
        name: 'Gaurav Patra',
        role: 'Angular Developer',
        email: 'gaurav@gmail.com',
        phone: '9000000017',
        team: 'Team C'
        
      },
      {
        name: 'Ayush Guharay',
        role: 'Backend Developer',
        email: 'ayush@gmail.com',
        phone: '9000000018',
        team: 'Team C'
        
      },
      {
        name: 'Anup Mohanty',
        role: 'Software Engineer',
        email: 'anup@gmail.com',
        phone: '9000000019',
        team: 'Team C'
      
      },
      {
        name: 'Adil Khan',
        role: 'UI Designer',
        email: 'adil@gmail.com',
        phone: '9000000020',
        team: 'Team C'
      
      },
      {
        name: 'Anurag Mohanty',
        role: 'Java Developer',
        email: 'anurag@gmail.com',
        phone: '9000000021',
        team: 'Team C'
        
      },
      {
        name: 'Debashis Tripathy',
        role: 'Full Stack Developer',
        email: 'debashis@gmail.com',
        phone: '9000000022',
        team: 'Team C'
        
      },
      {
        name: 'Safaq Jamal',
        role: 'Frontend Developer',
        email: 'safaq@gmail.com',
        phone: '9000000023',
        team: 'Team C'
        
      },
      {
        name: 'Sohan Mohanty',
        role: 'Backend Developer',
        email: 'sohan@gmail.com',
        phone: '9000000024',
        team: 'Team C'
    
      },
      {
        name: 'Hrushikesh Pattnaik',
        role: 'Angular Developer',
        email: 'hrushikesh@gmail.com',
        phone: '9000000025',
        team: 'Team C'
        
      }
    ],

    'Team D': [
      {
        name: 'Chandan Kumar Sahu',
        role: 'Frontend Developer',
        email: 'chandan@gmail.com',
        phone: '9000000026',
        team: 'Team D'
    
      },
      {
        name: 'Sitikanta Dalai',
        role: 'Backend Developer',
        email: 'sitikanta@gmail.com',
        phone: '9000000027',
        team: 'Team D'
        
      },
      {
        name: 'Titiksha Sahu',
        role: 'UI Designer',
        email: 'titiksha@gmail.com',
        phone: '9000000028',
        team: 'Team D'
      },
      {
        name: 'Anjali Sahoo',
        role: 'Angular Developer',
        email: 'anjali@gmail.com',
        phone: '9000000029',
        team: 'Team D'
        
      },
      {
        name: 'Sushree Sangita Sethi',
        role: 'Software Engineer',
        email: 'sushree@gmail.com',
        phone: '9000000030',
        team: 'Team D'
    
      }
    ],

    'Team E': [
      {
        name: 'Rajesh Behera',
        role: 'Frontend Developer',
        email: 'rajesh@gmail.com',
        phone: '9000000031',
        team: 'Team E'
    
      },
      {
        name: 'Maniketa Padhan',
        role: 'Backend Developer',
        email: 'maniketa@gmail.com',
        phone: '9000000032',
        team: 'Team E'
      },
      {
        name: 'Jeevan Jyoti Panigrahi',
        role: 'UI Designer',
        email: 'jeevan@gmail.com',
        phone: '9000000033',
        team: 'Team E'
        
      }
    ],

    'Team F': [
      {
        name: 'Rajshree Panda',
        role: 'Frontend Developer',
        email: 'rajshree@gmail.com',
        phone: '9000000034',
        team: 'Team F'
      
      },
      {
        name: 'Soumyashree Panda',
        role: 'Angular Developer',
        email: 'soumya@gmail.com',
        phone: '9000000035',
        team: 'Team F'
      },
      {
        name: 'Rupali Jena',
        role: 'Backend Developer',
        email: 'rupali@gmail.com',
        phone: '9000000036',
        team: 'Team F'
      
      },
      {
        name: 'Padmalaya Meher',
        role: 'Frontend Developer',
        email: 'padmalaya@gmail.com',
        phone: '9000000037',
        team: 'Team F'
        
      }
    ],

    'Team G': [
      {
        name: 'Shubham Kumar',
        role: 'Frontend Developer',
        email: 'shubham@gmail.com',
        phone: '9000000038',
        team: 'Team G'
      },
      {
        name: 'Yash Kumar',
        role: 'Backend Developer',
        email: 'yash@gmail.com',
        phone: '9000000039',
        team: 'Team G'
  
      },
      {
        name: 'Sasawat Rout',
        role: 'Angular Developer',
        email: 'sasawat@gmail.com',
        phone: '9000000040',
        team: 'Team G'
      
      },
      {
        name: 'Adarsh Kumar',
        role: 'Software Engineer',
        email: 'adarsh@gmail.com',
        phone: '9000000041',
        team: 'Team G'
      }
    ]
  };

  onMemberSelect(member:any){
    this.selectedMember = member;
  }

}