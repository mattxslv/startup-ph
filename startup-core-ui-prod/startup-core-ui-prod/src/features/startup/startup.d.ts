import { IProgram } from 'features/programs/types';

type TStartUp = {
  assessment_tags: TAssessmentTags[];
  barangay_code: string;
  business_classification: string;
  business_name: string;
  // content
  banner_url: string;
  body: Section[];
  description: string;
  development_phase: string;
  display_address: string;
  founder_name: string;
  founding_year: string;
  id: string;
  is_verified: 0 | 1;
  logo_url: string;
  municipality_code: string;
  name: string;
  oath_accepted_at: string;
  postal_code: string;
  proof_of_registration_url: string;
  province_code: string;
  region_code: string;
  registration_no: string;
  rejected_at: string;
  remarks: string;
  returned_at: string;
  sectors: string[];
  short_description: string;
  slug: string;
  social_facebook_url: string;
  social_instagram_url: string;
  social_linkedin_url: string;
  social_website_url: string;
  status:
    | 'UNVERIFIED'
    | 'FOR VERIFICATION'
    | 'VERIFIED'
    | 'REJECTED'
    | 'FOR RESUBMISSION';
  street: string;
  street_two: string;
  tin: string;
  user: TUser;
  verified_at: string;

  fundings: TFunding[];
  has_funding: 0 | 1 | null;
  startup_number: string;
  display_address: string;
  business_certificate_expiration_date: string;
  business_mobile_no: string;
  slug: string;
  permit_number: string;
};

type TFunding = {
  agency: string;
  document_urls: string[];
};

type TStartupApplications = {
  approved_at: string;
  id: number;
  program_id: number;
  program_name: string;
  // Program Object
  description: string;
  date_end: string;
  date_start: string;
  agency: string;
  banner_url: string;
  program_content_body: string;
  // End Program Object
  rejected_at: string;
  remarks: string;
  startup_name: string;
  returned_at: string;
  startup_id: string;
  status: string;
  submitted_at: string;
};

type TUser = {
  birth_date: string;
  birth_place: string;
  citizenship: string;
  display_name: string;
  email: string;
  email_verified_at: string;
  first_name: string;
  gender: string;
  id: number;
  identification_no: string;
  identification_type: string;
  identification_url: string;
  interests: string;
  is_registered_from_sso: 0 | 1;
  last_login_at: string;
  last_name: string;
  middle_name: string;
  mobile_no: string;
  mobile_no_verified_at: string;
  photo_url: string;
  registered_at: string;
  social_classification: string;
  suffix_name: string;
};

type Section =
  | {
      type: 'RICHTEXT';
      content: string;
    }
  | {
      type: 'VIDEO';
      source: 'youtube' | 'custom';
      video_url?: string;
      thumbnail_url?: string;
    }
  | {
      type: 'IMAGE';
      banner_url?: string;
    };

type TReturnStartup = {
  id: string | number;
  assessment_tags: Array<string>;
  remarks: string;
};

type TAssessmentTags = {
  id: number | string;
  code: string;
  description: string;
  notes: string | null;
  is_active: number;
};
