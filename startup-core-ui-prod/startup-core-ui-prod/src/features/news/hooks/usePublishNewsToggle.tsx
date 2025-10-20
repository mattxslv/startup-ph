import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

export const usePublishNewsToggle = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.post({
        url: `/api/v2/administrator/misc/news/${id}/toggle_published_status`,
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Updated!');
      setTimeout(() => {
        queryClient.invalidateQueries(['NEWS/list']);
        queryClient.invalidateQueries(['NEWS', id]);
      }, 500);
    },
  });
};
