import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

export const useRevokeIntegration = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.put({
        url: `/api/mng/api_client/${id}/revoke`,
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['INTEGRATION/list']);
    },
  });
};

export const useUnrevokeIntegration = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.put({
        url: `/api/mng/api_client/${id}/unrevoke`,
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['INTEGRATION/list']);
    },
  });
};
