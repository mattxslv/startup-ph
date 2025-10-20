import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import removeEmptyValues from 'utils/removeEmptyValues';
import { IRole } from '../types';

export const useCreateRole = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<IRole> }) =>
      ws.post({
        url: '/api/v2/administrator/roles',
        payload,
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['ROLE/list']);
    },
  });
};

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IRole>;
    }) =>
      ws.put({
        url: `/api/v2/administrator/roles/${id}`,
        payload: removeEmptyValues(payload),
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['ROLE/list']);
      queryClient.invalidateQueries(['ROLE', id]);
    },
  });
};

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/roles/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['ROLE/list']);
    },
  });
};
