export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  description: string;
  imageUrl: string;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  stage: string;
  completed_steps?: string[];
  current_step?: string;
  notes?: string;
}