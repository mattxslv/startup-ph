import { ws } from 'lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import formatNumber from 'utils/formatNumber';

interface IByNationalityAggs {
  unique_count: number;
  by_country: Array<{ label: string; count: number; count_human: string }>;
}

interface IBlacklistAggsFilter {
  date_from: string;
  date_to: string;
  size?: number;
}

const fetchByCountry =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IByNationalityAggs>(
      {
        url: '/api/mng/blacklist/aggs',
        params: {
          group: 'nationalities.keyword',
          size: 50, // to show all countries
          ...params,
        },
        transform: ({ data }) => {
          const unique_count = (data?.data?.['by_nationalities.keyword'] || [])
            .length;
          const by_country = (
            data?.data?.['by_nationalities.keyword'] || []
          ).map((x: any) => ({
            label: x.key,
            count: x.doc_count,
            count_human: formatNumber(x.doc_count, 0),
          }));
          return {
            unique_count,
            by_country,
          };
        },
      },
      { signal }
    );

export const useTopByCountryAggs = (params?: IBlacklistAggsFilter) => {
  return useQuery({
    queryKey: ['DASHBOARD/by_country', JSON.stringify(params)],
    queryFn: fetchByCountry(params),
    enabled: false,
  });
};
