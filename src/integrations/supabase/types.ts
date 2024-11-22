export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          price: number
          location: string
          bedrooms: number
          bathrooms: number
          sqft: number
          property_type: string
          description: string | null
          image_url: string | null
          source_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          price: number
          location: string
          bedrooms: number
          bathrooms: number
          sqft: number
          property_type: string
          description?: string | null
          image_url?: string | null
          source_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          price?: number
          location?: string
          bedrooms?: number
          bathrooms?: number
          sqft?: number
          property_type?: string
          description?: string | null
          image_url?: string | null
          source_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          stage: string
          completed_steps: string[] | null
          current_step: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stage?: string
          completed_steps?: string[] | null
          current_step?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stage?: string
          completed_steps?: string[] | null
          current_step?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]