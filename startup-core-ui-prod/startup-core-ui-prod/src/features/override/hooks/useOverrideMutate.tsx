import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { IOverride } from '../types';

export const useCreateOverride = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<IOverride> }) =>
      ws.post({
        url: '/api/mng/override',
        payload,
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['OVERRIDE/list']);
    },
  });
};

export const useUpdateOverride = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IOverride>;
    }) =>
      ws.put({
        url: `/api/mng/override/${id}`,
        payload,
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['OVERRIDE/list']);
    },
  });
};

export const useDeleteOverride = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/mng/override/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['OVERRIDE/list']);
    },
  });
};
