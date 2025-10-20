import { ws } from 'lib';
import { useMutation } from '@tanstack/react-query';

export const useTwoFA = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: TTwoFAForm }) => {
      return ws.post({
        url: '/api/v2/administrator/two_factor_authenticate',
        payload,
        transform: (res): string => {
          return res?.data?.token;
        },
      });
    },
  });
};
