export type ModelSlug = "6m" | "8m" | "10m" | "12m";

export interface Model {
  slug: ModelSlug;
  name: string;
  tagline: string;
  workingHeight: number;
  platformHeight: number;
  capacityKg: number | null;
  widthM: number | null;
  pricePerDay: number | null;
  advantage: string;
  bestFor: string;
  description: string;
  useCases: string[];
}

export interface Estimate {
  model: ModelSlug;
  days: number;
  onQuote: boolean;
  total: number | null;
  averagePerDay: number | null;
  discountApplied: boolean;
}

export interface UseCase {
  title: string;
  example: string;
  height: number;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}
