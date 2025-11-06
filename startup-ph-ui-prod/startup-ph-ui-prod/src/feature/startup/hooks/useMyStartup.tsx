import { useSession } from '@/context/my-auth';
import { queryClient, ws } from '@/lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import useProfile from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import { TStartup } from '../types';

const transform = (raw: any): TStartup => ({
  id: String(raw?.id),
  logo_url: raw?.logo_url || '',
  name: raw?.name || '',
  corporation_name: raw?.corporation_name || '',
  description: raw?.description || '',
  founder_name: raw?.founder_name || '',
  founding_year: raw?.founding_year || '',
  address_label: raw?.address_label || '',
  region_code: raw?.region_code || '',
  province_code: raw?.province_code || '',
  municipality_code: raw?.municipality_code || '',
  barangay_code: raw?.barangay_code || '',
  street: raw?.street || '',
  social_website_url: raw?.social_website_url || '',
  social_instagram_url: raw?.social_instagram_url || '',
  social_facebook_url: raw?.social_facebook_url || '',
  social_linkedin_url: raw?.social_linkedin_url || '',
  business_classification: raw?.business_classification || '',
  development_phase: raw?.development_phase || '',
  sectors: raw.sectors || [],
  tin: raw.tin || '',
  short_description: raw?.short_description || '',
  status: raw?.status,
  
  // status timestamps
  verified_at: raw?.verified_at,
  submitted_at: raw?.submitted_at,
  returned_at: raw?.returned_at,
  rejected_at: raw?.rejected_at,

  // content
  banner_url: raw?.content?.banner_url || '',
  body: raw?.content?.body || [],

  permit_number: raw?.permit_number || '',
  assessment_tags: raw?.assessment_tags || null,
  registration_no: raw?.registration_no || '',
  dti_permit_number: raw?.dti_permit_number || '',
  sec_permit_number: raw?.sec_permit_number || '',
  proof_of_registration_url: raw?.proof_of_registration_url || '',
  business_name: raw?.business_name || '',
  remarks: raw?.remarks || '',
  street_two: raw?.street_two || '',
  postal_code: raw?.postal_code || '',

  fundings: raw?.fundings || [],
  has_funding: typeof raw?.has_funding === 'number' ? raw?.has_funding : null,
  startup_number: raw?.startup_number || '',
  display_address: raw?.display_address || '',
  business_certificate_expiration_date: raw?.business_certificate_expiration_date || '',
  business_mobile_no: raw?.business_mobile_no || '',
  slug: raw?.slug || '',
});

const fetch =
  () =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<TStartup>(
      {
        url: `/api/v2/user/startup`,
        transform: ({ data }) => transform(data?.data),
      },
      { signal }
    );

export const reloadMyStartup = () => {
  queryClient.invalidateQueries(['MY_STARTUP']);
};

const useMyStartup = () => {
  const session = useSession();
  const { data: profile } = useProfile();
  const router = useRouter();
  return useQuery({
    queryKey: ['MY_STARTUP'],
    queryFn: fetch(),
    enabled: !!session?.data?.token && profile?._is_profile_completed,
    staleTime: 1000,
    onError: (res: any) => {
      if (res?.not_found) router.push('/profile/StartupForm');
    } /* /my-startup?first_time=1 */,
  });
};

export default useMyStartup;
