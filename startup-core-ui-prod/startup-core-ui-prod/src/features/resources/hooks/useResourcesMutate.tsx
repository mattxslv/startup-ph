import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { transformPayload } from '../transformers';
import { IResources } from '../types';

export const useCreateResources = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IResources }) =>
      ws.post({
        url: `/api/v2/administrator/misc/resources`,
        payload: transformPayload(payload),
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      setTimeout(() => {
        queryClient.invalidateQueries(['RESOURCES/list']);
      }, 500);
    },
  });
};

export const useUpdateResources = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: IResources }) =>
      ws.put({
        url: `/api/v2/administrator/misc/resources/${id}`,
        payload: transformPayload(payload),
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Updated!');
      setTimeout(() => {
        queryClient.invalidateQueries(['RESOURCES/list']);
        queryClient.invalidateQueries(['RESOURCES', id]);
      }, 500);
    },
  });
};

export const useDeleteResources = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/misc/resources/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      setTimeout(() => {
        queryClient.invalidateQueries(['RESOURCES/list']);
      }, 500);
    },
  });
};
