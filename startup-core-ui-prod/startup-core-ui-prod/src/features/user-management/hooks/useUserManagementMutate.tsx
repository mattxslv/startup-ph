import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { IUser } from '../types';
import removeEmptyValues from 'utils/removeEmptyValues';
import useSyncRole from './useSyncRole';

export const useCreateUserManagement = () => {
  const roleUpdator = useSyncRole();
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<IUser> }) => {
      const { role_id, role_name, ...rest } = payload;
      return ws.post({
        url: '/api/v2/administrator/administrators',
        payload: removeEmptyValues(rest),
        transform: ({ data }) => ({ id: data.data.id, role_id }),
      });
    },
    onSuccess: ({ id, role_id }) => {
      const payload = { roles: [role_id] };
      roleUpdator.mutate({ id: String(id), payload });
      Toast.success('Created!');
      queryClient.invalidateQueries(['USER_MANAGEMENT/list']);
    },
  });
};

export const useUpdateUserManagement = () => {
  const roleUpdator = useSyncRole();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IUser>;
    }) => {
      const { role_id, role_name, ...rest } = payload;
      return ws.put({
        url: `/api/v2/administrator/administrators/${id}`,
        payload: removeEmptyValues(rest),
        transform: () => ({ role_id }),
      });
    },
    onSuccess: ({ role_id }, { id }) => {
      const payload = { roles: [role_id] };
      roleUpdator.mutate({ id: String(id), payload });
      Toast.success('Updated!');
      queryClient.invalidateQueries(['USER_MANAGEMENT/list']);
      queryClient.invalidateQueries(['USER_MANAGEMENT', id]);
    },
  });
};

export const useDeleteUserManagement = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/administrators/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['USER_MANAGEMENT/list']);
    },
  });
};
