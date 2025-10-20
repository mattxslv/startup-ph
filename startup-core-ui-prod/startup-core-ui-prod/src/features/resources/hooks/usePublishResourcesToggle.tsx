import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

export const usePublishResourcesToggle = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.post({
        url: `/api/v2/administrator/misc/resources/${id}/toggle_published_status`,
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
