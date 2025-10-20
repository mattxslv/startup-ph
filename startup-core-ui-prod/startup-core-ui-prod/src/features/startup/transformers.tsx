import { omit } from 'lodash';
import { TStartUp, TStartupApplications } from './startup';

export const transformTags = (raw: any): TAssessmentTags => ({
  id: String(raw.id),
  code: raw?.code,
  description: raw?.description,
  notes: raw.notes || null,
  is_active: raw?.is_active,
});

export const transform = (raw: any): TStartUp => ({
  assessment_tags: raw?.assessment_tags || [],
  barangay_code: raw?.barangay_code || '',
  business_classification: raw?.business_classification || '',
  business_name: raw?.business_name || '',
  banner_url: raw?.content?.banner_url || '',
  body: raw?.content?.body || [],
  description: raw?.description || '',
  development_phase: raw?.development_phase || '',
  display_address: raw?.display_address || '',
  founder_name: raw?.founder_name || '',
  founding_year: raw?.founding_year || '',
  id: raw?.id || '',
  is_verified: raw?.is_verified || 0,
  logo_url: raw?.logo_url || '',
  municipality_code: raw?.municipality_code || '',
  name: raw?.name || '',
  oath_accepted_at: raw?.oath_accepted_at || '',
  postal_code: raw?.postal_code || '',
  proof_of_registration_url: raw?.proof_of_registration_url || '',
  province_code: raw?.province_code || '',
  region_code: '',
  registration_no: raw?.registration_no || '',
  rejected_at: raw?.rejected_at || '',
  remarks: raw?.remarks || '',
  returned_at: raw?.returned_at || '',
  sectors: raw?.sectors || [],
  short_description: raw?.short_description || '',
  slug: raw?.slug || '',
  social_facebook_url: raw?.social_facebook_url || '',
  social_instagram_url: raw?.social_instagram_url || '',
  social_linkedin_url: raw?.social_linkedin_url || '',
  social_website_url: raw?.social_website_url || '',
  status: raw?.status || 'UNVERIFIED',
  street: raw?.street || '',
  street_two: raw?.street_two || '',
  tin: raw?.tin || '',
  user: raw?.user || {},
  verified_at: raw?.verified_at || '',
  fundings: raw?.fundings || [],
  has_funding: raw?.has_funding || null,
  startup_number: raw?.startup_number || '',
  business_certificate_expiration_date:
    raw?.business_certificate_expiration_date || '',
  business_mobile_no: raw?.business_mobile_no || '',
  permit_number: raw?.permit_number || '',
});

export const transformStartupApplications = (
  raw: any
): TStartupApplications => ({
  id: raw?.id || '',
  approved_at: raw?.approved_at || '',
  program_id: raw?.program_id || 0,
  program_name: raw?.program_name || '',
  rejected_at: raw?.rejected_at || '',
  remarks: raw?.remarks || '',
  returned_at: raw?.returned_at || '',
  startup_id: raw?.startup_id || '',
  startup_name: raw?.startup_name || '',
  status: raw?.status || '',
  submitted_at: raw?.submitted_at || '',
  // Program Object
  description: raw?.program?.description || '',
  date_end: raw?.program?.date_end || '',
  date_start: raw?.program?.date_start || '',
  agency: raw?.program?.agency || '',
  banner_url: raw?.program?.banner_url || '',
  program_content_body: raw?.program?.content?.body || '',
  // End Program Object
});

export const transformPayload = (payload: TStartUp) => ({
  ...omit(payload, ['id']),
});
