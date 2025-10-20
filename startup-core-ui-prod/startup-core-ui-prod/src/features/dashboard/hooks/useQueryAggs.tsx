import { ws } from 'lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

interface IQueryAggs {
  without_result_count: number;
  with_result_count: number;
  total_count: number;
}

interface IQueryAggsFilter {
  date_from: string;
  date_to: string;
  size?: number;
  'api_client_id[]'?: string;
}

const fetchIsHit =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IQueryAggs>(
      {
        url: '/api/mng/query/aggs',
        params: {
          group: 'is_hit',
          ...params,
        },
        transform: ({ data }) => {
          const without_result_count = (data?.data?.by_is_hit || []).find(
            (x: any) => x.key === 'without_result'
          )?.doc_count;
          const with_result_count = (data?.data?.by_is_hit || []).find(
            (x: any) => x.key === 'with_result'
          )?.doc_count;
          const total_count = data?.meta?.total;
          return {
            without_result_count,
            with_result_count,
            total_count,
          };
        },
      },
      { signal }
    );

export const useQueryIsHitAggs = (params?: IQueryAggsFilter) => {
  return useQuery({
    queryKey: ['DASHBOARD/query_aggs/is_hit', JSON.stringify(params)],
    queryFn: fetchIsHit(params),
  });
};
