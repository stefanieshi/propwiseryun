export interface Profile {
  id: string;
  full_name: string | null;
  subscription_tier: 'free' | 'premium' | 'professional';
  subscription_status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  property_type: string;
  description: string;
  image_url: string;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyAnalytics {
  id: string;
  property_id: string;
  rental_yield: number;
  roi_estimate: number;
  market_trend: string;
  price_history: any;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  stage: string;
  completed_steps: string[];
  current_step: string;
  notes: string;
  updated_at: string;
}