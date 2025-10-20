import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformRole } from '../transformers';
import { IRole } from '../types';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IRole[]; pager?: IPagination }>(
      {
        url: '/api/v2/administrator/roles',
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformRole),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useRoleList = (params?: any) => {
  return useQuery({
    queryKey: ['ROLE/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default useRoleList;
