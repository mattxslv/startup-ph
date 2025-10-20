import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { TReturnStartup } from '../startup';

export const useVerifyStartUp = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.post({
        url: `/api/v2/administrator/startups/${id}/verify`,
      }),
    onSuccess: () => {
      Toast.success('Successfully verified application!');
      setTimeout(() => {
        queryClient.invalidateQueries(['STARTUP/list']);
      }, 500);
    },
  });
};
export const useReturnStartUp = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Omit<TReturnStartup, 'id'>;
    }) =>
      ws.post({
        url: `/api/v2/administrator/startups/${id}/return`,
        payload,
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      setTimeout(() => {
        queryClient.invalidateQueries(['STARTUP/list']);
      }, 500);
    },
  });
};
export const useRejectStartUp = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.post({
        url: `/api/v2/administrator/startups/${id}/reject`,
        payload: {
          remarks:
            'Rejected by the reviewer, please check your documents and submit again.', // TODO: Make this dynamic later
        },
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      setTimeout(() => {
        queryClient.invalidateQueries(['STARTUP/for_verification']);
      }, 500);
    },
  });
};
