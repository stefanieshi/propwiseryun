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
  source_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  stage: string;
  completed_steps?: string[];
  current_step?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}