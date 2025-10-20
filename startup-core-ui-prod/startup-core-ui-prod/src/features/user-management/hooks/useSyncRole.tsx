import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

const useSyncRole = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) =>
      ws.post({
        url: `/api/v2/administrator/administrators/${id}/sync_roles`,
        payload,
      }),
    onSuccess: (_, { id }) => {
      // Toast.success('Updated!');
      queryClient.invalidateQueries(['USER_MANAGEMENT', id]);
    },
  });
};
export default useSyncRole;
