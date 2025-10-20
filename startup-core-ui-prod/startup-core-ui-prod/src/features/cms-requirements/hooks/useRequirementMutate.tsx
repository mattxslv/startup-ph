import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { IRequirement } from '../types';
import { payloadRequirement } from '../transformers';

export const useCreateRequirement = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IRequirement }) =>
      ws.post({
        url: '/api/v2/administrator/misc/requirements',
        payload: payloadRequirement(payload),
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['REQUIREMENT/list']);
    },
  });
};

export const useUpdateRequirement = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IRequirement;
    }) =>
      ws.put({
        url: `/api/v2/administrator/misc/requirements/${id}`,
        payload: payloadRequirement(payload),
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['REQUIREMENT/list']);
    },
  });
};

export const useDeleteRequirement = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/misc/requirements/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['REQUIREMENT/list']);
    },
  });
};
