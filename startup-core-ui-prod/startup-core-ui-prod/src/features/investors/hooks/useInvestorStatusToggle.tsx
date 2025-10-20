import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { IForReviewPayload } from '../types';
import { payloadForReviewPayload } from '../transformers';

export const useFinalApprove = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.put({
        url: `/api/mng/investment/${id}/approve`,
        payload: { remarks: 'All requirements are reviewed and approved.' },
      }),
    onSuccess: (res, { id }) => {
      Toast.success('Approved!');
      queryClient.invalidateQueries(['INVESTOR/list']);
      queryClient.invalidateQueries(['INVESTOR', id]);
    },
  });
};

export const useForRequirementsSubmissionInvestor = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IForReviewPayload;
    }) => {
      await ws.put({
        url: `/api/mng/investment/${id}/requirement/attach`,
        payload: { requirement_id: payload.requirements },
      });
      return ws.put({
        url: `/api/mng/investment/${id}/for_requirements_submission`,
        payload: payloadForReviewPayload(payload),
      });
    },
    onSuccess: (res, { id }) => {
      Toast.success('Approved!');
      queryClient.invalidateQueries(['INVESTOR/list']);
      queryClient.invalidateQueries(['INVESTOR', id]);
    },
  });
};

export const useRejectInvestor = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: { remarks: string };
    }) =>
      ws.put({
        url: `/api/mng/investment/${id}/reject`,
        payload,
      }),
    onSuccess: (res, { id }) => {
      Toast.success('Rejected!');
      queryClient.invalidateQueries(['INVESTOR/list']);
      queryClient.invalidateQueries(['INVESTOR', id]);
    },
  });
};
