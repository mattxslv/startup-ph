import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';
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
  // Include params in queryKey so React Query properly caches per parameter combination
  const query = useQuery({
    queryKey: ['ADDRESS', type, params],
    queryFn: fetchList(type, params),
    enabled: true, // Always enabled, but will only fetch when params change
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes - addresses don't change often
    cacheTime: 60 * 60 * 1000, // Keep in cache for 1 hour
  });

  return query;
};

export default useAddressList;
