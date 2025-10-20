import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { transformPayload } from '../transformers';
import { IProgram } from '../types';

export const useCreateProgram = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IProgram }) =>
      ws.post({
        url: `/api/v2/administrator/programs`,
        payload: transformPayload(payload),
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['PROGRAM/list']);
    },
  });
};

export const useUpdateProgram = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: IProgram }) =>
      ws.put({
        url: `/api/v2/administrator/programs/${id}`,
        payload: transformPayload(payload),
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['PROGRAM/list']);
      queryClient.invalidateQueries(['PROGRAM', id]);
    },
  });
};

export const useDeleteProgram = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/programs/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['PROGRAM/list']);
    },
  });
};

export const usePublishProgram = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.post({
        url: `/api/v2/administrator/programs/${id}/toggle_publish`,
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['PROGRAM', id]);
    },
  });
};
