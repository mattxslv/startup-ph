import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';
import { useEffect } from 'react';
import { ws } from '@/lib';

const fetchList =
  (type: string, params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<{ list: TAddress[] }>(
      {
        url: `/api/v2/common/${type}`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transform),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useAddressList = (type: string, params?: any) => {
  const query = useQuery({
    queryKey: ['ADDRESS', type],
    queryFn: fetchList(type, params),
  });

  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useAddressList;
