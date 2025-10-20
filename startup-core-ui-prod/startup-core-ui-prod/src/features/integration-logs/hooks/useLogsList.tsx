import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformLogs } from '../transformers';
import { ILogs } from '../types';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: ILogs[]; pager?: IPagination }>(
      {
        url: '/api/mng/query',
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformLogs),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useLogsList = (params?: any) => {
  return useQuery({
    queryKey: ['LOGS/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default useLogsList;
