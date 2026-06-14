export interface Member {
  id: string;
  name: string;
  group: string;
}

export interface AttendanceRecord {
  memberId: string;
  date: string; 
  status: boolean;
  locked: boolean;
}

export interface AppData {
  members: Member[];
  attendance: AttendanceRecord[];
}

export class AttendanceStore {
  private static STORAGE_KEY = 'attendance_app_data';

  static getData(): AppData {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    
    if (!storedData) {
      const initialData: AppData = {
        members: [
          // Group A
            { id: '1', name: 'Soyngsruti Jena', group: 'Group A' },
            { id: '2', name: 'Swagat Das', group: 'Group A' },
            { id: '3', name: 'Samikshya Samadarshini', group: 'Group A' },
            { id: '4', name: 'Archana Devi', group: 'Group A' },
            { id: '5', name: 'Roshan Mishra', group: 'Group A' },
            { id: '6', name: 'Satyabrat Sarangi', group: 'Group A' },
            { id: '7', name: 'Priyanshu Sekhar', group: 'Group A' },
            { id: '8', name: 'Ankit Prasad', group: 'Group A' },
            { id: '9', name: 'Ronit Kumar Swain', group: 'Group A' },
            { id: '10', name: 'Jagannath Padhi', group: 'Group B' },
            { id: '11', name: 'Rohan Kumar Nayak', group: 'Group B' },
            { id: '12', name: 'Tushar Ranjan Muduli', group: 'Group B' },
            { id: '13', name: 'Snehasis Das', group: 'Group B' },
            { id: '14', name: 'Omkar Sahoo', group: 'Group B' },
            { id: '15', name: 'Motilal Turuk', group: 'Group B' },
            { id: '16', name: 'Gayatri Pati', group: 'Group C' },
            { id: '17', name: 'Gaurav Patra', group: 'Group C' },
            { id: '18', name: 'Ayush Guharay', group: 'Group C' },
            { id: '19', name: 'Anup Mohanty', group: 'Group C' },
            { id: '20', name: 'Adil Khan', group: 'Group C' },
            { id: '21', name: 'Anurag Mohanty', group: 'Group C' },
            { id: '22', name: 'Debashis Tripathy', group: 'Group C' },
            { id: '23', name: 'Safaq Jamal', group: 'Group C' },
            { id: '24', name: 'Sohan Mohanty', group: 'Group C' },
            { id: '25', name: 'Hrushikesh Pattnaik', group: 'Group C' },
            { id: '26', name: 'Chandan Kumar Sahu', group: 'Group D' },
            { id: '27', name: 'Sitikantha Dalal', group: 'Group D' },
            { id: '28', name: 'Titiksha Sahu', group: 'Group D' },
            { id: '29', name: 'Anjali Sahoo', group: 'Group D' },
            { id: '30', name: 'Sushree Sangita Sethi', group: 'Group D' },
            { id: '31', name: 'Mama Bisoi', group: 'Group D' },
            { id: '32', name: 'Tanmay Sahu', group: 'Group D' },
            { id: '33', name: 'Pratik Parag Pani', group: 'Group D' },
            { id: '34', name: 'Ranit Das', group: 'Group D' },
            { id: '35', name: 'Shobha Kumari', group: 'Group D' },
            { id: '36', name: 'CS Vishal Rout', group: 'Group D' },
            { id: '37', name: 'Rajesh Behera', group: 'Group E' },
            { id: '38', name: 'Maniket Padhan', group: 'Group E' },
            { id: '39', name: 'Jeevan Jyoti Panigrahi', group: 'Group E' },
            { id: '40', name: 'Ayush Mishra', group: 'Group E' },
            { id: '41', name: 'Mohit Singal', group: 'Group E' },
            { id: '42', name: 'Dhiraj Mahapatra', group: 'Group E' },
            { id: '43', name: 'Swayam Sahu', group: 'Group E' },
            { id: '44', name: 'Subhashree Mohapatra', group: 'Group E' },
            { id: '45', name: 'Subhalaxmi Sahoo', group: 'Group E' },
            { id: '46', name: 'Rajshree Panda', group: 'Group F' },
            { id: '47', name: 'Soumyashree Panda', group: 'Group F' },
            { id: '48', name: 'Rupali Jena', group: 'Group F' },
            { id: '49', name: 'Lipsa Panda', group: 'Group F' },
            { id: '50', name: 'Shreshtha Mohanty', group: 'Group F' },
            { id: '51', name: 'Sukanya Subhadarshini', group: 'Group F' },
            { id: '52', name: 'Anjali Mishra', group: 'Group F' },
            { id: '53', name: 'Prachi Pratyasha Das', group: 'Group F' },
            { id: '54', name: 'Nirmit Nayak', group: 'Group F' },
            { id: '55', name: 'Padmalaya Meher', group: 'Group F' },
            { id: '56', name: 'Shubham Kumar', group: 'Group G' },
            { id: '57', name: 'Yash Kumar', group: 'Group G' },
            { id: '58', name: 'Sasawat Rout', group: 'Group G' },
            { id: '59', name: 'Adarsh Kumar', group: 'Group G' },
            { id: '60', name: 'Amit Kumar Yash', group: 'Group G' },
            { id: '61', name: 'C H Tanisha', group: 'Group G' },
            { id: '62', name: 'Pratikshya Acharya', group: 'Group G' },
            { id: '63', name: 'Mahesh Dakua', group: 'Group G' },
            { id: '64', name: 'Anil Kumar Nayak', group: 'Group G' },
            { id: '65', name: 'Khushisahu', group: 'Group G' },
            { id: '66', name: 'Swarna Sharma', group: 'Group G' },
         
          

            
       
        ],
        attendance: []
      };
      this.saveData(initialData);
      return initialData;
    }
    
    return JSON.parse(storedData);
  }

  static saveData(data: AppData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static updateAttendance(memberId: string, date: string, status: boolean, locked: boolean): void {
    const data = this.getData();
    const index = data.attendance.findIndex(a => a.memberId === memberId && a.date === date);

    if (index > -1) {
      data.attendance[index].status = status;
      data.attendance[index].locked = locked;
    } else {
      data.attendance.push({ memberId, date, status, locked });
    }
    this.saveData(data);
  }
}