import { Section } from '@/components/input-campaign/types';

type TStartup = {
  id: string;

  logo_url: string;
  name: string;
  corporation_name: string;
  description: string;

  // founder
  founder_name: string;
  founding_year: string;

  // address
  address_label: string;
  region_code: string;
  province_code: string;
  municipality_code: string;
  barangay_code: string;
  street: string;
  street_two: string;
  postal_code: string;

  short_description: string;

  // social
  social_website_url: string;
  social_instagram_url: string;
  social_facebook_url: string;
  social_linkedin_url: string;

  business_classification: string;
  development_phase: string;
  sectors: string[];
  tin: string;
  permit_number: string;
  registration_no: string;
  dti_permit_number: string;
  sec_permit_number: string;
  proof_of_registration_url: string;

  status?: 'UNVERIFIED' | 'FOR VERIFICATION' | 'VERIFIED' | 'REJECTED' | 'FOR RESUBMISSION';

  // content start
  banner_url?: string;
  body?: Section[];
  // content end

  assessment_tags: TAssessmentTags[];
  business_name: string;
  remarks: string;

  fundings: TFunding[];
  has_funding: 0 | 1 | null;
  startup_number: string;
  display_address: string;
  business_certificate_expiration_date: string;
  business_mobile_no: string;
  slug: string;
};

type TAssessmentTags = {
  code: string;
  description: string;
  notes: string | null;
  meta: TMeta;
};

type TMeta = {
  pdf_url: string;
};

type TFunding = {
  agency: string;
  document_urls: string[];
};
