import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformIntegration } from '../transformers';
import { IIntegration } from '../types';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IIntegration[]; pager?: IPagination }>(
      {
        url: '/api/mng/api_client',
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformIntegration),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useIntegrationList = (params?: any) => {
  return useQuery({
    queryKey: ['INTEGRATION/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default useIntegrationList;
