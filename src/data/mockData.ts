
export interface VitalData {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  timestamp: Date;
  sparkline: number[];
  status: 'normal' | 'warning' | 'critical';
  icon: string;
  ranges: {
    normal: number[];
    warning: number[];
  };
}

export interface ChartData {
  id: string;
  date: string;
  heartRate: number;
  spO2: number;
  temperature: number;
  hydration: number;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  doctorName: string;
  specialty: string;
  isVideoCall: boolean;
}

export interface Consultation {
  id: string;
  date: Date;
  doctorName: string;
  specialty: string;
  notes: string;
  prescriptions: string[];
  hasPDF: boolean;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

// Mock Vitals Data
export const vitalsData: VitalData[] = [
  {
    id: 'heart-rate',
    name: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    timestamp: new Date(),
    sparkline: [68, 70, 67, 72, 70, 69, 72],
    status: 'normal',
    icon: 'heart',
    ranges: {
      normal: [60, 100],
      warning: [50, 120],
    },
  },
  {
    id: 'spo2',
    name: 'SpO₂',
    value: 98,
    unit: '%',
    timestamp: new Date(),
    sparkline: [98, 97, 99, 98, 98, 97, 98],
    status: 'normal',
    icon: 'droplet',
    ranges: {
      normal: [95, 100],
      warning: [90, 94],
    },
  },
  {
    id: 'temperature',
    name: 'Body Temperature',
    value: 37.2,
    unit: '°C',
    timestamp: new Date(),
    sparkline: [36.8, 36.9, 37.0, 37.1, 37.2, 37.0, 37.2],
    status: 'normal',
    icon: 'thermometer',
    ranges: {
      normal: [36.5, 37.5],
      warning: [35.9, 38.0],
    },
  },
  {
    id: 'blood-pressure',
    name: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    timestamp: new Date(),
    sparkline: [120, 118, 122, 119, 120, 121, 120],
    status: 'normal',
    icon: 'heart',
    ranges: {
      normal: [90, 120],
      warning: [80, 140],
    },
  },
];

// Mock Chart Data (7 days)
export const weekChartData: ChartData[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  
  return {
    id: `day-${i}`,
    date: date.toISOString().split('T')[0],
    heartRate: 65 + Math.floor(Math.random() * 15),
    spO2: 95 + Math.floor(Math.random() * 5),
    temperature: 36.5 + Math.random(),
    hydration: 50 + Math.floor(Math.random() * 40),
  };
});

// Mock Chart Data (30 days)
export const monthChartData: ChartData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  return {
    id: `day-${i}`,
    date: date.toISOString().split('T')[0],
    heartRate: 65 + Math.floor(Math.random() * 20),
    spO2: 93 + Math.floor(Math.random() * 7),
    temperature: 36.2 + Math.random() * 1.5,
    hydration: 40 + Math.floor(Math.random() * 50),
  };
});

// Mock Chart Data (365 days)
export const yearChartData: ChartData[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));
  
  return {
    id: `month-${i}`,
    date: `${date.toISOString().split('T')[0].slice(0, 7)}`,
    heartRate: 65 + Math.floor(Math.random() * 15),
    spO2: 94 + Math.floor(Math.random() * 6),
    temperature: 36.4 + Math.random() * 1.2,
    hydration: 45 + Math.floor(Math.random() * 45),
  };
});

// Mock Appointments
export const appointments: Appointment[] = [
  {
    id: 'app-1',
    date: new Date(Date.now() + 86400000), // Tomorrow
    time: '10:00 AM',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    isVideoCall: true,
  },
  {
    id: 'app-2',
    date: new Date(Date.now() + 345600000), // 4 days later
    time: '2:30 PM',
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Medicine',
    isVideoCall: false,
  },
  {
    id: 'app-3',
    date: new Date(Date.now() + 604800000), // 7 days later
    time: '11:15 AM',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    isVideoCall: true,
  },
];

// Mock Consultations
export const consultations: Consultation[] = [
  {
    id: 'cons-1',
    date: new Date(Date.now() - 1209600000), // 2 weeks ago
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    notes: "Patient's heart rate normal. Advised to monitor blood pressure daily.",
    prescriptions: ['Amlodipine 5mg', 'Aspirin 75mg'],
    hasPDF: true,
  },
  {
    id: 'cons-2',
    date: new Date(Date.now() - 2592000000), // 1 month ago
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Medicine',
    notes: "Patient reported flu-like symptoms. Prescribed rest and advised to increase fluid intake.",
    prescriptions: ['Paracetamol 500mg', 'Cetirizine 10mg'],
    hasPDF: true,
  },
  {
    id: 'cons-3',
    date: new Date(Date.now() - 7776000000), // 3 months ago
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    notes: "Patient had mild eczema on left arm. Prescribed topical cream and advised to avoid certain detergents.",
    prescriptions: ['Hydrocortisone 1% cream'],
    hasPDF: false,
  },
];

// Mock AI Recommendations
export const aiRecommendations = [
  'Based on your heart rate pattern, consider short meditation sessions.',
  'Your hydration is below optimal. Try drinking 2 more glasses of water daily.',
  'Your sleep quality could improve with a consistent bedtime routine.',
  'Your SpO₂ levels are optimal. Keep up your current activity levels.',
];

// Mock Messages
export const messages: Message[] = [
  {
    id: 'msg-1',
    sender: 'Dr. Sarah Johnson',
    content: 'Hi there! How have you been feeling since our last appointment?',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
  },
  {
    id: 'msg-2',
    sender: 'Dr. Michael Chen',
    content: 'Your test results came in. Everything looks normal. Keep up the good work!',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
  },
  {
    id: 'msg-3',
    sender: 'Nurse Patel',
    content: 'Just a reminder about your appointment tomorrow at 10:00 AM with Dr. Johnson.',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    read: true,
  },
];

// Has ABHA ID
export const hasABHAId = false; // Set to false to show the ABHA ID banner

// User Profile
export const userProfile = {
  name: 'Priya Sharma',
  avatar: '/placeholder.svg', // Using placeholder for now
  age: 32,
  gender: 'Female',
  bloodGroup: 'O+',
  height: '165 cm',
  weight: '62 kg',
};
