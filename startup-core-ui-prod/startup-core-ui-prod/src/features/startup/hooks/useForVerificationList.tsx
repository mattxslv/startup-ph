import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';
import { useEffect } from 'react';
import { TStartUp } from '../startup';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: TStartUp[]; pager?: IPagination }>(
      {
        url: `/api/v2/administrator/startups`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transform),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useForVerificationList = (params?: any) => {
  const query = useQuery({
    queryKey: ['STARTUP/for_verification'],
    queryFn: fetchList(params),
  });
  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useForVerificationList;
