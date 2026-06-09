export interface Student {
  id: number;
  name: string;
  team: string;
  present: boolean;
}

export const STUDENTS: Student[] = [

  // GROUP A
  { id: 1, name: 'Soyngsruti Jena', team: 'A', present: false },
  { id: 2, name: 'Swagat Das', team: 'A', present: false },
  { id: 3, name: 'Samikshya Samadarshini', team: 'A', present: false },
  { id: 4, name: 'Archana Devi', team: 'A', present: false },
  { id: 5, name: 'Roshan Mishra', team: 'A', present: false },
  { id: 6, name: 'Satyabrat Sarangi', team: 'A', present: false },
  { id: 7, name: 'Priyanshu Sekhar', team: 'A', present: false },
  { id: 8, name: 'Ankit Prasad', team: 'A', present: false },
  { id: 9, name: 'Ronit Kumar Swain', team: 'A', present: false },

  // GROUP B
  { id: 10, name: 'Jagannath Padhi', team: 'B', present: false },
  { id: 11, name: 'Rohan Kumar Nayak', team: 'B', present: false },
  { id: 12, name: 'Tushar Ranjan Muduli', team: 'B', present: false },
  { id: 13, name: 'Snehasis Das', team: 'B', present: false },
  { id: 14, name: 'Omkar Sahoo', team: 'B', present: false },
  { id: 15, name: 'Motilal Turuk', team: 'B', present: false },

  // GROUP C
  { id: 16, name: 'Gayatri Pati', team: 'C', present: false },
  { id: 17, name: 'Gaurav Patra', team: 'C', present: false },
  { id: 18, name: 'Ayush Guharay', team: 'C', present: false },
  { id: 19, name: 'Anup Mohanty', team: 'C', present: false },
  { id: 20, name: 'Adil Khan', team: 'C', present: false },
  { id: 21, name: 'Anurag Mohanty', team: 'C', present: false },
  { id: 22, name: 'Debashis Tripathy', team: 'C', present: false },
  { id: 23, name: 'Safaq Jamal', team: 'C', present: false },
  { id: 24, name: 'Sohan Mohanty', team: 'C', present: false },
  { id: 25, name: 'Hrushikesh Pattnaik', team: 'C', present: false },

  // GROUP D
  { id: 26, name: 'Chandan Kumar Sahu', team: 'D', present: false },
  { id: 27, name: 'Sitikantha Dalal', team: 'D', present: false },
  { id: 28, name: 'Titiksha Sahu', team: 'D', present: false },
  { id: 29, name: 'Anjali Sahoo', team: 'D', present: false },
  { id: 30, name: 'Sushree Sangita Sethi', team: 'D', present: false },
  { id: 31, name: 'Mama Bisoi', team: 'D', present: false },
  { id: 32, name: 'Tanmay Sahu', team: 'D', present: false },
  { id: 33, name: 'Pratik Parag Pani', team: 'D', present: false },
  { id: 34, name: 'Ranit Das', team: 'D', present: false },
  { id: 35, name: 'Shobha Kumari', team: 'D', present: false },
  { id: 36, name: 'CS Vishal Rout', team: 'D', present: false },

  // GROUP E
  { id: 37, name: 'Rajesh Behera', team: 'E', present: false },
  { id: 38, name: 'Maniket Padhan', team: 'E', present: false },
  { id: 39, name: 'Jeevan Jyoti Panigrahi', team: 'E', present: false },
  { id: 40, name: 'Ayush Mishra', team: 'E', present: false },
  { id: 41, name: 'Mohit Singal', team: 'E', present: false },
  { id: 42, name: 'Dhiraj Mahapatra', team: 'E', present: false },
  { id: 43, name: 'Swayam Sahu', team: 'E', present: false },
  { id: 44, name: 'Subhashree Mohapatra', team: 'E', present: false },
  { id: 45, name: 'Subhalaxmi Sahoo', team: 'E', present: false },

  // GROUP F
  { id: 46, name: 'Rajshree Panda', team: 'F', present: false },
  { id: 47, name: 'Soumyashree Panda', team: 'F', present: false },
  { id: 48, name: 'Rupali Jena', team: 'F', present: false },
  { id: 49, name: 'Lipsa Panda', team: 'F', present: false },
  { id: 50, name: 'Shreshtha Mohanty', team: 'F', present: false },
  { id: 51, name: 'Sukanya Subhadarshini', team: 'F', present: false },
  { id: 52, name: 'Anjali Mishra', team: 'F', present: false },
  { id: 53, name: 'Prachi Pratyasha Das', team: 'F', present: false },
  { id: 54, name: 'Nirmit Nayak', team: 'F', present: false },
  { id: 55, name: 'Padmalaya Meher', team: 'F', present: false },

  // GROUP G
  { id: 56, name: 'Shubham Kumar', team: 'G', present: false },
  { id: 57, name: 'Yash Kumar', team: 'G', present: false },
  { id: 58, name: 'Sasawat Rout', team: 'G', present: false },
  { id: 59, name: 'Adarsh Kumar', team: 'G', present: false },
  { id: 60, name: 'Amit Kumar Yash', team: 'G', present: false },
  { id: 61, name: 'C H Tanisha', team: 'G', present: false },
  { id: 62, name: 'Pratikshya Acharya', team: 'G', present: false },
  { id: 63, name: 'Mahesh Dakua', team: 'G', present: false },
  { id: 64, name: 'Anil Kumar Nayak', team: 'G', present: false },
  { id: 65, name: 'Khushisahu', team: 'G', present: false },
  { id: 66, name: 'Swarna Sharma', team: 'G', present: false }

];