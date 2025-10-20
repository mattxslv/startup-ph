export interface IInvestor {
  id?: string;
  company_name: string;
  name: string;
  company_nationality: string;
  company_location: string;
  activity_type: string;
  estimated_cost: string;
  min_estimated_employment: string;
  max_estimated_employment: string;
  estimated_start_date: string;
  description: string;
  representative_first_name: string;
  representative_last_name: string;
  representative_email: string;
  representative_contact_number: string;
  status: TInvestorStatus;

  estimated_start_date_human?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IRequirements {
  id: string;
  file_url: string;
  name: string;
  description?: string;
  status: TRequirmentStatus;
  remarks?: string;
}

export interface IForReviewPayload {
  expiry_date_in_days: string;
  requirements: string[];
}

export type TInvestorStatus =
  | 'For Review'
  | 'For Requirements Submission'
  | 'For Requirements Review'
  | 'Approved'
  | 'Rejected';
export type TRequirmentStatus =
  | 'For Submission'
  | 'For Review'
  | 'Resubmit'
  | 'Approved';
