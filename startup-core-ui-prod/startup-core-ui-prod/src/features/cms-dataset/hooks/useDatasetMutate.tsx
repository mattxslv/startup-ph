import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { IDataset } from '../types';
import { payloadDataset } from '../transformers';

export const useCreateDataset = (code: string) => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IDataset }) =>
      ws.post({
        url: '/api/v2/administrator/misc/datasets',
        payload: payloadDataset(payload),
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['DATASET/list', code]);
    },
  });
};

export const useUpdateDataset = (code: string) => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: IDataset }) =>
      ws.put({
        url: `/api/v2/administrator/misc/datasets/${id}`,
        payload: payloadDataset(payload),
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['DATASET/list', code]);
    },
  });
};

export const useDeleteDataset = (code: string) => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/misc/datasets/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['DATASET/list', code]);
    },
  });
};
