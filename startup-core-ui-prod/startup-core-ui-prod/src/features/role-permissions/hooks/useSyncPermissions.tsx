import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

const useSyncPermissions = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Array<number>;
    }) =>
      ws.post({
        url: `/api/v2/administrator/roles/${id}/sync_permissions`,
        payload: { permissions: payload },
      }),
    onSuccess: () => {
      Toast.success(
        'Role permissions updated, User needs to re-login to take effect.'
      );
      queryClient.invalidateQueries(['ROLE/list']);
    },
  });
};
export default useSyncPermissions;
