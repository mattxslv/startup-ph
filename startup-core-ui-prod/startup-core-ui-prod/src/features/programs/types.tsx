export interface IProgram {
  id: string;
  agency: string;
  name: string;
  thumbnail_url?: string;
  banner_url?: string;
  type: string;
  date_start: string;
  date_end: string;
  description: string;
  is_verified_required: '1' | '0';
  body?: string;
  requirements?: Record<string, TRequirement>;
  is_open_for_application: 1 | 0;
  is_published: 1 | 0;
}

export interface TRequirement {
  enabled: boolean;
  required: boolean;
}

export type TSubmittedRequirement = {
  requirement_id: string;
  label: string;
  value: string;
  type: 'INPUT' | 'FILE';
};

export interface IApplication {
  id: string;
  program_id: string;
  startup_id: string;
  startup_name: string;
  status: string;
  submitted_at: string;
  approved_at?: string;
  returned_at?: string;
  rejected_at?: string;
  remarks?: string;

  user_name?: string;
  user_email?: string;
  user_mobile_no?: string;
  requirements?: Array<TSubmittedRequirement>;
}
