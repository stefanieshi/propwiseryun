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
  description?: string | null;
  source_url?: string | null;
  created_at?: string;
  updated_at?: string;
}
export type ExternalProperty = Tables<"external_properties">
export type UserProgress = Tables<"user_progress">