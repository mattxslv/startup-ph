import { ws } from 'lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { transformStats } from '../transformers';
import removeEmptyValues from 'utils/removeEmptyValues';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<TStatistics>(
      {
        url: `/api/v2/administrator/dashboard/statistics`,
        params: removeEmptyValues(params),
        transform: ({ data }) => transformStats(data),
      },
      { signal }
    );

const useDashboardTotalCount = (params?: any) => {
  const query = useQuery({
    queryKey: [`DASHBOARD/total_counts`],
    queryFn: fetchList(params),
  });

  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useDashboardTotalCount;
