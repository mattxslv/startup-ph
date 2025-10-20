import { queryClient, ws } from '@/lib';
import { mdyToYmd } from '@/utils/formatDate';
import { useMutation } from '@tanstack/react-query';
import formatMobileNumber from '@/utils/formatMobileNumber';
import { IProfile } from './useProfile';
import { pick } from 'lodash';
import removeEmptyValues from '@/utils/removeEmpty';

const formatPayload = ({ mobile_no, birth_date, ...rest }: Partial<IProfile>) =>
  removeEmptyValues({
    ...rest,
    birth_date: birth_date ? mdyToYmd(birth_date) : '',
    mobile_no: formatMobileNumber(mobile_no),
    profile_type: 'STARTUP',
  });

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<IProfile> }) =>
      await ws.put({
        url: `/api/v2/user/profile`,
        payload: formatPayload(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['PROFILE']);
    },
  });
};

const usePatchUpdate = (keys: Array<keyof IProfile>) => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<IProfile> }) =>
      await ws.patch({
        url: `/api/v2/user/profile`,
        // payload: formatPayload(payload),
        payload: pick(formatPayload(payload), keys),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['PROFILE']);
    },
  });
};

export const useUpdateBasicProfile = () => {
  return usePatchUpdate([
    'first_name',
    'middle_name',
    'last_name',
    'gender',
    'birth_date',
    'birth_place',
    'mobile_no',
    'citizenship',
    'social_classification',
    'interests',
  ]);
};

export const useUpdateIdentification = () => {
  return usePatchUpdate(['identification_type', 'identification_no', 'identification_url']);
};

export default useUpdateProfile;
