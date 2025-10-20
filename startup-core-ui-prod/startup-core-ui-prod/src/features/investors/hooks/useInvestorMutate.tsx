import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';
import { IInvestor } from '../types';
import { payloadInvestor } from '../transformers';

export const useCreateInvestor = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IInvestor }) =>
      ws.post({
        url: '/api/mng/investment',
        payload: payloadInvestor(payload),
        transform: ({ data }) => data?.data?.uuid,
      }),
    onSuccess: () => {
      Toast.success('Created!');
      queryClient.invalidateQueries(['INVESTOR/list']);
    },
  });
};

export const useUpdateInvestor = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: IInvestor }) =>
      ws.put({
        url: `/api/mng/investment/${id}`,
        payload: payloadInvestor(payload),
      }),
    onSuccess: () => {
      Toast.success('Updated!');
      queryClient.invalidateQueries(['INVESTOR/list']);
    },
  });
};

export const useDeleteInvestor = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.remove({
        url: `/api/mng/investment/${id}`,
      }),
    onSuccess: () => {
      Toast.success('Deleted!');
      queryClient.invalidateQueries(['INVESTOR/list']);
    },
  });
};
