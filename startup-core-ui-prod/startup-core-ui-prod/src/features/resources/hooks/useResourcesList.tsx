import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';
import { IResources } from '../types';
import { useEffect } from 'react';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IResources[]; pager?: IPagination }>(
      {
        url: `/api/v2/administrator/misc/resources`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transform),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useResourcesList = (params?: any) => {
  const query = useQuery({
    queryKey: ['RESOURCES/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useResourcesList;
