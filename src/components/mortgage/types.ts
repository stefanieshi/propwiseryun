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