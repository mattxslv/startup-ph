import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';
import { INews } from '../types';
import { useEffect } from 'react';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: INews[]; pager?: IPagination }>(
      {
        url: `/api/v2/administrator/misc/news`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transform),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useNewsList = (params?: any) => {
  const query = useQuery({
    queryKey: ['NEWS/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useNewsList;
