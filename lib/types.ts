export interface ChurchInfo {
  name: string;
  shortName: string;
  tagline: string;
  motto: string;
  address: string;
  phone: string;
  email: string;
  pastor: string;
  logoUrl: string;
  copyrightYear: number;
  serviceTimes: {
    sundayService: string;
    sundaySchool: string;
    workersPrayer: string;
    midweekPrayer: string;
    bibleStudy: string;
  };
  socialLinks: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
}

export interface SermonItem {
  id: string;
  title: string;
  speaker: string;
  date: string;
  description: string;
  videoUrl?: string | null;
  audioUrl?: string | null;
  series?: string | null;
}

export interface ProgramEventItem {
  id: string;
  title: string;
  dayOrFrequency: string;
  time: string;
  description?: string | null;
  category: 'WEEKLY' | 'MONTHLY';
  order: number;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  quoteOrDescription: string;
  imageUrl?: string | null;
  order: number;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface PrayerRequestInput {
  name: string;
  email?: string;
  phone?: string;
  request: string;
  isPrivate?: boolean;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
