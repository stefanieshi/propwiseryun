import { Json } from "@/integrations/supabase/types";

export interface PriceHistoryData {
  date: string;
  'Property Price': number;
  'Area Average': number;
  'City Average': number;
}

export interface MarketTrendsData {
  price_per_sqft_trend: Array<{ date: string; value: number }>;
  days_on_market: Array<{ date: string; value: number }>;
  market_health_index: number;
  supply_demand_ratio: number;
}

export interface InvestmentMetricsData {
  roi_5_years: number;
  cash_flow_potential: number;
  cap_rate: number;
  break_even_period: number;
}

export interface SustainabilityData {
  energy_efficiency: number;
  green_features: string[];
  environmental_impact: number;
}

export interface AreaStats {
  population_growth: number;
  median_income: number;
  school_ratings: number;
  crime_rate: number;
}

export interface RentalEstimates {
  monthly_rent: number;
  yearly_rent: number;
  occupancy_rate: number;
}

export interface PropertyAnalytics {
  id: string;
  property_id: string;
  price_history: PriceHistoryData[] | Json;
  market_trends: MarketTrendsData | Json;
  investment_metrics: InvestmentMetricsData | Json;
  sustainability_score: SustainabilityData | Json;
  area_stats: AreaStats | Json;
  rental_estimates: RentalEstimates | Json;
  ai_recommendations: string[] | null;
  neighborhood_insights: Json | null;
  created_at: string;
  updated_at: string;
}