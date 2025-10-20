import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

interface IProgramRequirementPayload {
  requirements: Array<{
    requirement_id: string;
    is_required: number;
  }>;
}

export const useSyncProgramRequirements = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IProgramRequirementPayload;
    }) =>
      ws.post({
        url: `/api/v2/administrator/programs/${id}/sync_requirements`,
        payload,
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['PROGRAM', id]);
    },
  });
};
