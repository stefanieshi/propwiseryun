import { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">
export type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  imageUrl: string;
  description?: string;
  source_url?: string;
  created_at: string;
  updated_at: string;
}
export type UserProgress = Tables<"user_progress">