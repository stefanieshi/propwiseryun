export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_reports: {
        Row: {
          created_at: string
          id: string
          payment_status: string
          property_id: string
          report_content: Json
          stripe_payment_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment_status?: string
          property_id: string
          report_content: Json
          stripe_payment_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment_status?: string
          property_id?: string
          report_content?: Json
          stripe_payment_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_reports_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      area_analytics: {
        Row: {
          average_price: number
          city: string
          created_at: string
          growth_rates: Json | null
          historical_prices: Json | null
          id: string
          postcode: string
          price_history: Json | null
          property_counts: Json | null
          property_types: Json | null
          rental_yields: Json | null
          updated_at: string
        }
        Insert: {
          average_price: number
          city: string
          created_at?: string
          growth_rates?: Json | null
          historical_prices?: Json | null
          id?: string
          postcode: string
          price_history?: Json | null
          property_counts?: Json | null
          property_types?: Json | null
          rental_yields?: Json | null
          updated_at?: string
        }
        Update: {
          average_price?: number
          city?: string
          created_at?: string
          growth_rates?: Json | null
          historical_prices?: Json | null
          id?: string
          postcode?: string
          price_history?: Json | null
          property_counts?: Json | null
          property_types?: Json | null
          rental_yields?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      broker_matches: {
        Row: {
          broker_id: string
          created_at: string
          id: string
          match_reasons: string[] | null
          match_score: number
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          broker_id: string
          created_at?: string
          id?: string
          match_reasons?: string[] | null
          match_score: number
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          broker_id?: string
          created_at?: string
          id?: string
          match_reasons?: string[] | null
          match_score?: number
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "broker_matches_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      broker_messages: {
        Row: {
          broker_match_id: string
          content: string
          created_at: string
          id: string
          read_at: string | null
          sender_type: string
          updated_at: string
        }
        Insert: {
          broker_match_id: string
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_type: string
          updated_at?: string
        }
        Update: {
          broker_match_id?: string
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broker_messages_broker_match_id_fkey"
            columns: ["broker_match_id"]
            isOneToOne: false
            referencedRelation: "broker_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      broker_reviews: {
        Row: {
          broker_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          broker_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          broker_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "broker_reviews_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      brokers: {
        Row: {
          approval_rate: number | null
          average_processing_time: number | null
          created_at: string
          description: string | null
          fees: Json | null
          id: string
          lender_partnerships: string[] | null
          min_credit_score: number | null
          name: string
          profile_picture_url: string | null
          rating: number | null
          review_count: number | null
          specializations: string[] | null
          updated_at: string
        }
        Insert: {
          approval_rate?: number | null
          average_processing_time?: number | null
          created_at?: string
          description?: string | null
          fees?: Json | null
          id?: string
          lender_partnerships?: string[] | null
          min_credit_score?: number | null
          name: string
          profile_picture_url?: string | null
          rating?: number | null
          review_count?: number | null
          specializations?: string[] | null
          updated_at?: string
        }
        Update: {
          approval_rate?: number | null
          average_processing_time?: number | null
          created_at?: string
          description?: string | null
          fees?: Json | null
          id?: string
          lender_partnerships?: string[] | null
          min_credit_score?: number | null
          name?: string
          profile_picture_url?: string | null
          rating?: number | null
          review_count?: number | null
          specializations?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      conveyancing_documents: {
        Row: {
          content: Json
          created_at: string
          document_type: string
          fraud_check_result: Json | null
          id: string
          land_registry_status: string | null
          lawyer_id: string
          risk_score: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          document_type: string
          fraud_check_result?: Json | null
          id?: string
          land_registry_status?: string | null
          lawyer_id: string
          risk_score?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          document_type?: string
          fraud_check_result?: Json | null
          id?: string
          land_registry_status?: string | null
          lawyer_id?: string
          risk_score?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conveyancing_documents_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conveyancing_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conveyancing_tasks: {
        Row: {
          assigned_to: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
          workflow_id: string | null
        }
        Insert: {
          assigned_to: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
          workflow_id?: string | null
        }
        Update: {
          assigned_to?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conveyancing_tasks_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "conveyancing_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      conveyancing_workflows: {
        Row: {
          completion_status: Json
          created_at: string
          current_stage: string
          id: string
          lawyer_id: string
          property_id: string
          stamp_duty_calculation: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_status?: Json
          created_at?: string
          current_stage: string
          id?: string
          lawyer_id: string
          property_id: string
          stamp_duty_calculation?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_status?: Json
          created_at?: string
          current_stage?: string
          id?: string
          lawyer_id?: string
          property_id?: string
          stamp_duty_calculation?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conveyancing_workflows_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conveyancing_workflows_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conveyancing_workflows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          content: Json
          created_at: string
          id: string
          jurisdiction: string
          name: string
          template_type: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          jurisdiction: string
          name: string
          template_type: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          jurisdiction?: string
          name?: string
          template_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      external_properties: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          description: string | null
          external_id: string
          id: string
          image_url: string | null
          location: string
          price: number
          property_type: string | null
          source: string
          sqft: number | null
          title: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          external_id: string
          id?: string
          image_url?: string | null
          location: string
          price: number
          property_type?: string | null
          source: string
          sqft?: number | null
          title: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          external_id?: string
          id?: string
          image_url?: string | null
          location?: string
          price?: number
          property_type?: string | null
          source?: string
          sqft?: number | null
          title?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_properties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_lawyers: {
        Row: {
          created_at: string
          id: string
          lawyer_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lawyer_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lawyer_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_lawyers_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_lawyers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      land_registry_submissions: {
        Row: {
          completed_at: string | null
          created_at: string
          documents: Json
          id: string
          registration_number: string | null
          status: string
          submission_type: string
          submitted_at: string | null
          updated_at: string
          validation_result: Json | null
          workflow_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          documents: Json
          id?: string
          registration_number?: string | null
          status?: string
          submission_type: string
          submitted_at?: string | null
          updated_at?: string
          validation_result?: Json | null
          workflow_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          documents?: Json
          id?: string
          registration_number?: string | null
          status?: string
          submission_type?: string
          submitted_at?: string | null
          updated_at?: string
          validation_result?: Json | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "land_registry_submissions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "conveyancing_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_orders: {
        Row: {
          created_at: string
          id: string
          lawyer_id: string
          price: number
          service_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lawyer_id: string
          price: number
          service_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lawyer_id?: string
          price?: number
          service_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_orders_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_news: {
        Row: {
          ai_analysis: string | null
          category: string
          created_at: string | null
          id: string
          impact_score: number | null
          location: string
          published_at: string | null
          source_url: string | null
          summary: string
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_analysis?: string | null
          category: string
          created_at?: string | null
          id?: string
          impact_score?: number | null
          location: string
          published_at?: string | null
          source_url?: string | null
          summary: string
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_analysis?: string | null
          category?: string
          created_at?: string | null
          id?: string
          impact_score?: number | null
          location?: string
          published_at?: string | null
          source_url?: string | null
          summary?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mortgage_documents: {
        Row: {
          content_type: string
          created_at: string
          document_type: string
          extracted_data: Json | null
          file_path: string
          id: string
          original_name: string
          size: number
          updated_at: string
          user_id: string
          validation_details: Json | null
          validation_status: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          document_type: string
          extracted_data?: Json | null
          file_path: string
          id?: string
          original_name: string
          size: number
          updated_at?: string
          user_id: string
          validation_details?: Json | null
          validation_status?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          document_type?: string
          extracted_data?: Json | null
          file_path?: string
          id?: string
          original_name?: string
          size?: number
          updated_at?: string
          user_id?: string
          validation_details?: Json | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mortgage_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pre_approvals: {
        Row: {
          approval_likelihood: number
          created_at: string
          credit_score: number
          criteria_matched: string[] | null
          debt_to_income_ratio: number | null
          employment_status: string
          estimated_amount: number
          id: string
          income: number
          interest_rate_range: Json | null
          monthly_payment_range: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approval_likelihood: number
          created_at?: string
          credit_score: number
          criteria_matched?: string[] | null
          debt_to_income_ratio?: number | null
          employment_status: string
          estimated_amount: number
          id?: string
          income: number
          interest_rate_range?: Json | null
          monthly_payment_range?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approval_likelihood?: number
          created_at?: string
          credit_score?: number
          criteria_matched?: string[] | null
          debt_to_income_ratio?: number | null
          employment_status?: string
          estimated_amount?: number
          id?: string
          income?: number
          interest_rate_range?: Json | null
          monthly_payment_range?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pre_approvals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          bathrooms: number
          bedrooms: number
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: string
          price: number
          property_type: string
          source_url: string | null
          sqft: number
          title: string
          updated_at: string
        }
        Insert: {
          bathrooms: number
          bedrooms: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          price: number
          property_type: string
          source_url?: string | null
          sqft: number
          title: string
          updated_at?: string
        }
        Update: {
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          price?: number
          property_type?: string
          source_url?: string | null
          sqft?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_analytics: {
        Row: {
          ai_recommendations: string[] | null
          area_stats: Json | null
          created_at: string
          id: string
          investment_metrics: Json | null
          market_trends: Json | null
          neighborhood_insights: Json | null
          price_history: Json | null
          property_id: string
          rental_estimates: Json | null
          sustainability_score: Json | null
          updated_at: string
        }
        Insert: {
          ai_recommendations?: string[] | null
          area_stats?: Json | null
          created_at?: string
          id?: string
          investment_metrics?: Json | null
          market_trends?: Json | null
          neighborhood_insights?: Json | null
          price_history?: Json | null
          property_id: string
          rental_estimates?: Json | null
          sustainability_score?: Json | null
          updated_at?: string
        }
        Update: {
          ai_recommendations?: string[] | null
          area_stats?: Json | null
          created_at?: string
          id?: string
          investment_metrics?: Json | null
          market_trends?: Json | null
          neighborhood_insights?: Json | null
          price_history?: Json | null
          property_id?: string
          rental_estimates?: Json | null
          sustainability_score?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_analytics_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_commute_analysis: {
        Row: {
          commute_distance: number | null
          commute_time: number | null
          created_at: string
          destination_id: string | null
          id: string
          property_id: string | null
          updated_at: string
        }
        Insert: {
          commute_distance?: number | null
          commute_time?: number | null
          created_at?: string
          destination_id?: string | null
          id?: string
          property_id?: string | null
          updated_at?: string
        }
        Update: {
          commute_distance?: number | null
          commute_time?: number | null
          created_at?: string
          destination_id?: string | null
          id?: string
          property_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_commute_analysis_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "user_destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_commute_analysis_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_comparisons: {
        Row: {
          created_at: string
          id: string
          property_ids: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_ids: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_ids?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_comparisons_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_searches: {
        Row: {
          created_at: string
          id: string
          property_id: string
          results: Json
          search_type: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          results: Json
          search_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          results?: Json
          search_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_searches_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_area_analyses: {
        Row: {
          created_at: string
          filters: Json | null
          id: string
          selected_areas: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          filters?: Json | null
          id?: string
          selected_areas: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          filters?: Json | null
          id?: string
          selected_areas?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_area_analyses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_reports: {
        Row: {
          created_at: string
          id: string
          property_id: string | null
          report_data: Json
          report_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id?: string | null
          report_data: Json
          report_type: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string | null
          report_data?: Json
          report_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_reports_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_destinations: {
        Row: {
          address: string
          created_at: string
          id: string
          importance: string | null
          latitude: number
          longitude: number
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          importance?: string | null
          latitude: number
          longitude: number
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          importance?: string | null
          latitude?: number
          longitude?: number
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_destinations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed_steps: string[] | null
          created_at: string
          current_step: string | null
          id: string
          notes: string | null
          stage: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_steps?: string[] | null
          created_at?: string
          current_step?: string | null
          id?: string
          notes?: string | null
          stage?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_steps?: string[] | null
          created_at?: string
          current_step?: string | null
          id?: string
          notes?: string | null
          stage?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
