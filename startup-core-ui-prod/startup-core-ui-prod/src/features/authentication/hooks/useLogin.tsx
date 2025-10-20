import { ws } from 'lib';
import { useMutation } from '@tanstack/react-query';
import { showOtpModal } from '../components/OtpModal';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: TLoginForm }) => {
      return ws.post({
        url: '/api/v2/administrator/authenticate',
        payload,
        transform: (res): string => {
          return res?.data?.token;
        },
      });
    },
    onError: (err: any) => {
      if (err?.secondary_authentication) {
        showOtpModal(err?.authToken);
      }
    },
  });
};
