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
    whatsapp?: string;
    telegram?: string;
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

export interface TestimonialItem {
  id: string;
  name: string;
  locationOrRole?: string | null;
  category: string;
  title: string;
  story: string;
  scripture?: string | null;
  date: string;
  isApproved?: boolean;
}

export interface TestimonialInput {
  name: string;
  locationOrRole?: string;
  category: string;
  title: string;
  story: string;
  scripture?: string;
}

export interface FormSubmissionResult<T = unknown> {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: T;
}

export type GalleryCategory = 'ALL' | 'EVENTS' | 'PROGRAMS' | 'OUTREACH' | 'WORSHIP';

export interface GalleryImageItem {
  id: string;
  title: string;
  category: 'EVENTS' | 'PROGRAMS' | 'OUTREACH' | 'WORSHIP';
  description: string;
  imageUrl: string;
  date: string;
  location: string;
  featured?: boolean;
}

export interface ChurchUpdateItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string | null;
  publishedAt: string;
  isPublished: boolean;
}

export interface ChurchUpdateInput {
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  publishedAt?: string;
  isPublished?: boolean;
}

