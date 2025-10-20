import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

export const useCreateAssessmentTags = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: TAssessmentTags }) =>
      ws.post({
        url: `/api/v2/administrator/misc/assessment_tags`,
        payload,
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['ASSESSMENT_TAGS/list']);
    },
  });
};

export const useUpdateAssessmentTags = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: TAssessmentTags;
    }) =>
      ws.put({
        url: `/api/v2/administrator/misc/assessment_tags/${id}`,
        payload,
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['ASSESSMENT_TAGS/list']);
    },
  });
};

export const useDeleteAssessmentTags = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/v2/administrator/misc/assessment_tags/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['ASSESSMENT_TAGS/list']);
    },
  });
};
