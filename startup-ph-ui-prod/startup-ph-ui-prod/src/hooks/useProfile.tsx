import { useSession } from '@/context/my-auth';
import { queryClient, ws } from '@/lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

export interface IProfile {
  id: string;
  birth_date: string;
  birth_place: string;
  citizenship: string;
  display_name: string;
  email: string;
  email_verified_at: string;
  first_name: string;
  gender: string;
  identification_no?: string;
  identification_type?: string;
  identification_url?: string;
  interests: string[];
  last_name: string;
  middle_name: string;
  mobile_no: string;
  mobile_no_verified_at: string;
  photo_url: string;
  registered_at: string;
  social_classification: string;
  suffix_name: string;
  last_login_at: string;
  _is_profile_completed?: boolean;
  _is_profile_from_sso?: boolean;
  _is_email_verified: boolean;
  _is_mobile_verified: boolean;
}

export const GENDER_OPTIONS = [
  { label: 'Preferred not to say', value: '' },
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
];

export const EXTENSION_NAMES = [
  { label: 'N/A', value: '' },
  { label: 'JR', value: 'JR' },
  { label: 'SR', value: 'SR' },
  { label: 'II', value: 'II' },
  { label: 'III', value: 'III' },
  { label: 'IV', value: 'IV' },
  { label: 'V', value: 'V' },
  { label: 'VI', value: 'VI' },
  { label: 'VII', value: 'VII' },
  { label: 'VIII', value: 'VIII' },
  { label: 'IX', value: 'IX' },
  { label: 'X', value: 'X' },
  { label: 'XI', value: 'XI' },
  { label: 'XII', value: 'XII' },
  { label: 'XIII', value: 'XIII' },
  { label: 'XIV', value: 'XIV' },
  { label: 'XV', value: 'XV' },
  { label: 'XVI', value: 'XVI' },
  { label: 'XVII', value: 'XVII' },
  { label: 'XVIII', value: 'XVIII' },
  { label: 'XIX', value: 'XIX' },
  { label: 'XX', value: 'XX' },
];

export const MAP_GENDER_LABEL: Record<string, string> = {
  M: 'Male',
  F: 'Female',
};

const transformProfile = (raw: any): IProfile => ({
  id: String(raw?.id),
  birth_date: raw.birth_date || '',
  birth_place: raw?.birth_place || '',
  citizenship: raw?.citizenship || '',
  display_name: raw?.display_name || '',
  email: raw?.email || '',
  email_verified_at: raw?.email_verified_at || '',
  first_name: raw?.first_name || '',
  gender: raw?.gender || '',
  identification_no: raw?.identification_no || '',
  identification_type: raw?.identification_type || '',
  identification_url: raw?.identification_url || '',
  interests: raw?.interests || '',
  last_name: raw?.last_name || '',
  middle_name: raw?.middle_name || '',
  mobile_no: raw?.mobile_no || '',
  mobile_no_verified_at: raw?.mobile_no_verified_at || '',
  photo_url: raw?.photo_url || '',
  registered_at: raw?.registered_at || '',
  social_classification: raw?.social_classification || '',
  suffix_name: raw?.suffix_name || '',
  last_login_at: raw?.last_login_at || '',
  _is_profile_completed: !isEmpty(raw?.display_name),
  _is_profile_from_sso: Boolean(raw?.is_registered_from_sso),
  _is_email_verified: Boolean(raw?.email_verified_at),
  _is_mobile_verified: Boolean(raw?.mobile_no_verified_at),
});

const fetch =
  () =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<IProfile>(
      {
        url: `/api/v2/user/profile`,
        transform: ({ data }) => transformProfile(data?.data),
      },
      { signal }
    );

export const invalidateProfile = () => {
  queryClient.invalidateQueries(['PROFILE']);
};

const useProfile = () => {
  const session = useSession();
  const router = useRouter();
  return useQuery({
    queryKey: ['PROFILE'],
    queryFn: fetch(),
    enabled: !!session?.data?.token,
    staleTime: 1000,
    onSuccess: (res) => {
      if (!res._is_profile_completed) router.push('/profile/update');
    },
  });
};

export default useProfile;
