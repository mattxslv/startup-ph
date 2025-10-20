import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformOverride } from '../transformers';
import { IOverride } from '../types';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IOverride[]; pager?: IPagination }>(
      {
        url: '/api/mng/override',
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformOverride),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useOverrideList = (params?: any) => {
  return useQuery({
    queryKey: ['OVERRIDE/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default useOverrideList;
