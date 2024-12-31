export interface BrokerReview {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    full_name: string | null;
  };
}

export interface Broker {
  id: string;
  name: string;
  description: string | null;
  approval_rate: number | null;
  specializations: string[];
  average_processing_time: number | null;
  rating: number | null;
  review_count: number | null;
  profile_picture_url: string | null;
}

export interface BrokerMatch {
  broker_id: string;
  match_score: number;
  match_reasons: string[];
  broker: Broker;
  reviews: BrokerReview[];
}

export interface PreApprovalData {
  id: string;
  estimated_amount: number;
  approval_likelihood: number;
  criteria_matched: string[];
  interest_rate_range: {
    min: number;
    max: number;
  };
  monthly_payment_range: {
    min: number;
    max: number;
  };
  created_at: string;
}

export interface PreApprovalResponse {
  id: string;
  estimated_amount: number;
  approval_likelihood: number;
  criteria_matched: string[];
  interest_rate_range: any;
  monthly_payment_range: any;
  created_at: string;
}