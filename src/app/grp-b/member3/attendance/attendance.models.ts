export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Unmarked';

export interface Student {
  name: string;
  registrationNumber: string;
}

export interface AttendanceRecord {
  name: string;
  registrationNumber: string;
  status: AttendanceStatus;
}

export interface TableRecord extends AttendanceRecord {
  attendancePercentage: number;
}

export interface AttendanceByDate {
  [dateKey: string]: AttendanceRecord[];
}

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

export interface MonthlyAnalytics {
  daysTracked: number;
  avgPercentage: number;
  bestDay: string;
  bestDayPercentage: number;
}

export interface MonthlyStats {
  totalPercentage: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
}

export interface TopPerformer {
  name: string;
  registrationNumber: string;
  percentage: number;
  streak: number;
}

export interface HeatmapCell {
  dateKey: string;
  day: number;
  status: 'present' | 'late' | 'absent' | 'none';
  label: string;
}

export interface MemberPercentages {
  [registrationNumber: string]: number;
}

export interface AttendanceStorage {
  attendanceByDate: AttendanceByDate;
  lockedDates: string[];
  students: Student[];
  memberPercentages: MemberPercentages;
  members?: string[];
}
