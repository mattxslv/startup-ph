import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

const useResetPass = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.put({
        url: `/api/v2/administrator/administrators/${id}/reset_password`,
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Password rest successfully');
      queryClient.invalidateQueries(['USER_MANAGEMENT', id]);
    },
  });
};
export default useResetPass;
