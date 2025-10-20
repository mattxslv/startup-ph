import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { IApplication } from '../types';
import { transformApplication } from '../transformers';
import { queryClient, ws } from 'lib';
import { Toast } from 'ui/components';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IApplication>(
      {
        url: `/api/v2/administrator/applications/${id}`,
        transform: ({ data }) => transformApplication(data?.data),
      },
      { signal }
    );

const useProgramApplicationById = (id: string) => {
  return useQuery({
    queryKey: ['APPLICATION', id],
    queryFn: fetch(id),
  });
};

export const useApplicationApprove = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      ws.post({
        url: `/api/v2/administrator/applications/${id}/approve`,
      }),
    onSuccess: (_, { id }) => {
      Toast.success('Approved!');
      queryClient.invalidateQueries(['APPLICATION', id]);
    },
  });
};
export const useApplicationReturn = () => {
  return useMutation({
    mutationFn: async ({
      id,
      remarks,
    }: {
      id: string;
      remarks: string;
      cb: () => void;
    }) =>
      ws.post({
        url: `/api/v2/administrator/applications/${id}/return`,
        payload: { remarks },
      }),
    onSuccess: (_, { id, cb }) => {
      cb();
      Toast.success('Returned!');
      queryClient.invalidateQueries(['APPLICATION', id]);
    },
  });
};
export const useApplicationReject = () => {
  return useMutation({
    mutationFn: async ({
      id,
      remarks,
    }: {
      id: string;
      remarks: string;
      cb: () => void;
    }) =>
      ws.post({
        url: `/api/v2/administrator/applications/${id}/reject`,
        payload: { remarks },
      }),
    onSuccess: (_, { id, cb }) => {
      cb();
      Toast.success('Rejected!');
      queryClient.invalidateQueries(['APPLICATION', id]);
    },
  });
};

export default useProgramApplicationById;
