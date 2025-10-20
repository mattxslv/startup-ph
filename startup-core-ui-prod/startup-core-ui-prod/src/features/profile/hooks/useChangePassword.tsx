import { ws } from 'lib';
import { useMutation } from '@tanstack/react-query';
import { IChangePassword } from '../types';
import { Toast } from 'ui/components';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IChangePassword }) =>
      ws.post({
        url: '/api/v2/administrator/change_password',
        payload,
        transform: (res): string => res?.data?.token,
      }),
    onSuccess: () => {
      Toast.success('Password Updated!');
    },
  });
};
