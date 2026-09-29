export type PlanId = 'curation' | 'masterpiece' | 'onetime';

export interface Plan {
  id: PlanId;
  name: string;
  badge?: string;
  isPopular?: boolean;
  priceText: string;
  periodText: string;
  originalPriceText?: string;
  tagline: string;
  description: string;
  coverImage: string;
  features: string[];
  specs: { label: string; value: string }[];
  processSummary: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  planId: PlanId;
  planName: string;
  childAge: string;
  referral: string;
  memo?: string;
  createdAt: string;
  status: '상담대기' | '상담완료' | '안내문자발송';
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  childInfo: string;
  planName: string;
  quote: string;
  detailedReview: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}
