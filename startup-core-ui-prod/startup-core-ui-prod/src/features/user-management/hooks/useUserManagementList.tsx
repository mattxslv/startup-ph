import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformUser } from '../transformers';
import { IUser } from '../types';
import { useEffect } from 'react';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IUser[]; pager?: IPagination }>(
      {
        url: '/api/v2/administrator/administrators',
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformUser),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useUserManagementList = (params?: any) => {
  const query = useQuery({
    queryKey: ['USER_MANAGEMENT/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });

  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useUserManagementList;
