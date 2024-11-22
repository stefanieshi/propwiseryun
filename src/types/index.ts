import { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">
export type Property = Tables<"properties">
export type UserProgress = Tables<"user_progress">