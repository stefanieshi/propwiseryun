export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  property_type: string;
  description?: string;
  image_url?: string;
  source_url?: string;
  crime_rate?: number;
  mortgage?: number;
  cost_of_living?: number;
  council_tax?: number;
  roi?: number;
  avg_monthly_rent?: number;
  service_charge?: number;
  ground_rent?: number;
  time_on_market?: string;
  created_at: string;
  updated_at: string;
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

export interface UserDestination {
  id: string;
  user_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  importance?: string;
  created_at: string;
  updated_at: string;
}

export interface AreaAnalytics {
  average_price: number;
  city: string;
  rental_yields: any;
  price_history: any;
  postcode: string;
  id: string;
  property_types: any;
  historical_prices: Record<string, number>;
}