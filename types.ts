
export interface EducationRow {
  qualification: string;
  passingYear: string;
  percentage: string;
  stream: string;
  collegeName: string;
}

export interface ApplicationFormData {
  // Personal
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  
  // Agent Tracking
  agentCode?: string;

  // Education
  education: EducationRow[];

  // Career
  preferredSector: string[];
  otherSector?: string;
  preferredJobType: string;
  careerGoal: string;
  skills: string;
  englishProficiency: 'yes' | 'no' | 'basic';
  expectedSalary: string;
  preferredLocation: string;
  hasPreviousExperience: 'yes' | 'no';
  prevCompany?: string;
  prevDesignation?: string;
  prevDuration?: string;
  additionalInfo?: string;

  // Documents
  resumeName?: string;

  // Declaration
  signature: string;
  date: string;
}

export interface AgentFormData {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  aadhaar?: string;
  agentCode?: string;
  registrationDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
