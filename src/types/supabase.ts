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
      ai_reports: {
        Row: {
          id: string
          user_id: string
          property_id: string
          report_content: Json
          payment_status: string
          stripe_payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          report_content: Json
          payment_status?: string
          stripe_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          report_content?: Json
          payment_status?: string
          stripe_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      area_analytics: {
        Row: {
          id: string
          postcode: string
          city: string
          average_price: number
          price_history: Json | null
          rental_yields: Json | null
          property_counts: Json | null
          growth_rates: Json | null
          created_at: string
          updated_at: string
          property_types: Json | null
          historical_prices: Json | null
        }
        Insert: {
          id?: string
          postcode: string
          city: string
          average_price: number
          price_history?: Json | null
          rental_yields?: Json | null
          property_counts?: Json | null
          growth_rates?: Json | null
          created_at?: string
          updated_at?: string
          property_types?: Json | null
          historical_prices?: Json | null
        }
        Update: {
          id?: string
          postcode?: string
          city?: string
          average_price?: number
          price_history?: Json | null
          rental_yields?: Json | null
          property_counts?: Json | null
          growth_rates?: Json | null
          created_at?: string
          updated_at?: string
          property_types?: Json | null
          historical_prices?: Json | null
        }
      }
      broker_matches: {
        Row: {
          id: string
          user_id: string
          broker_id: string
          match_score: number
          match_reasons: string[] | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          broker_id: string
          match_score: number
          match_reasons?: string[] | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          broker_id?: string
          match_score?: number
          match_reasons?: string[] | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      broker_messages: {
        Row: {
          id: string
          broker_match_id: string
          sender_type: string
          content: string
          read_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          broker_match_id: string
          sender_type: string
          content: string
          read_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          broker_match_id?: string
          sender_type?: string
          content?: string
          read_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      broker_reviews: {
        Row: {
          id: string
          broker_id: string
          user_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          broker_id: string
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          broker_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      brokers: {
        Row: {
          id: string
          name: string
          description: string | null
          approval_rate: number | null
          min_credit_score: number | null
          specializations: string[] | null
          lender_partnerships: string[] | null
          average_processing_time: number | null
          fees: Json | null
          rating: number | null
          review_count: number | null
          created_at: string
          updated_at: string
          profile_picture_url: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          approval_rate?: number | null
          min_credit_score?: number | null
          specializations?: string[] | null
          lender_partnerships?: string[] | null
          average_processing_time?: number | null
          fees?: Json | null
          rating?: number | null
          review_count?: number | null
          created_at?: string
          updated_at?: string
          profile_picture_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          approval_rate?: number | null
          min_credit_score?: number | null
          specializations?: string[] | null
          lender_partnerships?: string[] | null
          average_processing_time?: number | null
          fees?: Json | null
          rating?: number | null
          review_count?: number | null
          created_at?: string
          updated_at?: string
          profile_picture_url?: string | null
        }
      }
      favorite_lawyers: {
        Row: {
          id: string
          user_id: string
          lawyer_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lawyer_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lawyer_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      lawyer_orders: {
        Row: {
          id: string
          user_id: string
          lawyer_id: string
          service_type: string
          status: string
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lawyer_id: string
          service_type: string
          status?: string
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lawyer_id?: string
          service_type?: string
          status?: string
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      market_news: {
        Row: {
          id: string
          location: string
          title: string
          summary: string
          source_url: string | null
          category: string
          impact_score: number | null
          ai_analysis: string | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          location: string
          title: string
          summary: string
          source_url?: string | null
          category: string
          impact_score?: number | null
          ai_analysis?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          location?: string
          title?: string
          summary?: string
          source_url?: string | null
          category?: string
          impact_score?: number | null
          ai_analysis?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      mortgage_documents: {
        Row: {
          id: string
          user_id: string
          document_type: string
          file_path: string
          original_name: string
          content_type: string
          size: number
          extracted_data: Json | null
          validation_status: string | null
          validation_details: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          document_type: string
          file_path: string
          original_name: string
          content_type: string
          size: number
          extracted_data?: Json | null
          validation_status?: string | null
          validation_details?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          document_type?: string
          file_path?: string
          original_name?: string
          content_type?: string
          size?: number
          extracted_data?: Json | null
          validation_status?: string | null
          validation_details?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      pre_approvals: {
        Row: {
          id: string
          user_id: string
          income: number
          credit_score: number
          employment_status: string
          debt_to_income_ratio: number | null
          estimated_amount: number
          interest_rate_range: Json | null
          monthly_payment_range: Json | null
          approval_likelihood: number
          criteria_matched: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          income: number
          credit_score: number
          employment_status: string
          debt_to_income_ratio?: number | null
          estimated_amount: number
          interest_rate_range?: Json | null
          monthly_payment_range?: Json | null
          approval_likelihood: number
          criteria_matched?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          income?: number
          credit_score?: number
          employment_status?: string
          debt_to_income_ratio?: number | null
          estimated_amount?: number
          interest_rate_range?: Json | null
          monthly_payment_range?: Json | null
          approval_likelihood?: number
          criteria_matched?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
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
      property_analytics: {
        Row: {
          id: string
          property_id: string
          price_history: Json | null
          rental_estimates: Json | null
          area_stats: Json | null
          ai_recommendations: string[] | null
          created_at: string
          updated_at: string
          market_trends: Json | null
          investment_metrics: Json | null
          neighborhood_insights: Json | null
          sustainability_score: Json | null
        }
        Insert: {
          id?: string
          property_id: string
          price_history?: Json | null
          rental_estimates?: Json | null
          area_stats?: Json | null
          ai_recommendations?: string[] | null
          created_at?: string
          updated_at?: string
          market_trends?: Json | null
          investment_metrics?: Json | null
          neighborhood_insights?: Json | null
          sustainability_score?: Json | null
        }
        Update: {
          id?: string
          property_id?: string
          price_history?: Json | null
          rental_estimates?: Json | null
          area_stats?: Json | null
          ai_recommendations?: string[] | null
          created_at?: string
          updated_at?: string
          market_trends?: Json | null
          investment_metrics?: Json | null
          neighborhood_insights?: Json | null
          sustainability_score?: Json | null
        }
      }
      property_commute_analysis: {
        Row: {
          id: string
          property_id: string | null
          destination_id: string | null
          commute_time: number | null
          commute_distance: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          destination_id?: string | null
          commute_time?: number | null
          commute_distance?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string | null
          destination_id?: string | null
          commute_time?: number | null
          commute_distance?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      property_comparisons: {
        Row: {
          id: string
          user_id: string
          property_ids: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_ids: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_ids?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      saved_area_analyses: {
        Row: {
          id: string
          user_id: string
          title: string
          selected_areas: string[]
          filters: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          selected_areas: string[]
          filters?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          selected_areas?: string[]
          filters?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      saved_reports: {
        Row: {
          id: string
          user_id: string
          title: string
          property_id: string | null
          report_type: string
          report_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          property_id?: string | null
          report_type: string
          report_data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          property_id?: string | null
          report_type?: string
          report_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_destinations: {
        Row: {
          id: string
          user_id: string
          name: string
          address: string
          latitude: number
          longitude: number
          importance: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          address: string
          latitude: number
          longitude: number
          importance?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          address?: string
          latitude?: number
          longitude?: number
          importance?: string | null
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