import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { IIntegration } from '../types';
import { payloadIntegration } from '../transformers';

export const useCreateIntegration = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<IIntegration> }) =>
      ws.post({
        url: '/api/mng/api_client',
        payload: payloadIntegration(payload),
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['INTEGRATION/list']);
    },
  });
};

export const useUpdateIntegration = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IIntegration>;
    }) =>
      ws.put({
        url: `/api/mng/api_client/${id}`,
        payload: payloadIntegration(payload),
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['INTEGRATION/list']);
    },
  });
};

export const useDeleteIntegration = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/mng/api_client/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['INTEGRATION/list']);
    },
  });
};
