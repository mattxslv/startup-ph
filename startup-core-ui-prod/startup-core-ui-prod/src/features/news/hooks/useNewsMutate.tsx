import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { transformPayload } from '../transformers';
import { INews } from '../types';

export const useCreateNews = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: INews }) =>
      ws.post({
        url: `/api/v2/administrator/misc/news`,
        payload: transformPayload(payload),
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      setTimeout(() => {
        queryClient.invalidateQueries(['NEWS/list']);
      }, 500);
    },
  });
};

export const useUpdateNews = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: INews }) =>
      ws.put({
        url: `/api/v2/administrator/misc/news/${id}`,
        payload: transformPayload(payload),
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Updated!');
      setTimeout(() => {
        queryClient.invalidateQueries(['NEWS/list']);
        queryClient.invalidateQueries(['NEWS', id]);
      }, 500);
    },
  });
};

export const useDeleteNews = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/misc/news/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      setTimeout(() => {
        queryClient.invalidateQueries(['NEWS/list']);
      }, 500);
    },
  });
};
