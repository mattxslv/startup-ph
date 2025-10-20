import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

export const useApproveRequirement = () => {
  return useMutation({
    mutationFn: async ({
      investorId,
      requirementId,
    }: {
      investorId: string;
      requirementId: string;
    }) =>
      ws.put({
        url: `/api/mng/investment/${investorId}/attachment/${requirementId}/approve`,
      }),
    onSuccess: (_, { investorId }) => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['INVESTOR/requirements_list', investorId]);
    },
  });
};

export const useRejectRequirement = () => {
  return useMutation({
    mutationFn: async ({
      investorId,
      requirementId,
    }: {
      investorId: string;
      requirementId: string;
    }) =>
      ws.put({
        url: `/api/mng/investment/${investorId}/attachment/${requirementId}/resubmit`,
        payload: { remarks: 'Submited document is rejected' }, // TODO: MAKE THIS DYNAMIC LATER
      }),
    onSuccess: (_, { investorId }) => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['INVESTOR/requirements_list', investorId]);
    },
  });
};
