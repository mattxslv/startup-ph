import { ws } from '@/lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { orderBy } from 'lodash';

export interface IFlatOption {
  name: string;
}

const fetchList =
  (code: string, params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<{ options: TSelectOption[]; flat: Record<string, IFlatOption> }>(
      {
        url: '/api/v2/common/datasets',
        params: { per_page: 1000, code, ...params },
        transform: ({ data }) => {
          const flat: Record<string, IFlatOption> = {};
          const options = (data?.data ?? []).map((row: any) => {
            const item = row?.value;
            if (item.label) flat[item.label] = item.label;
            return {
              label: item.label,
              value: item.label,
            };
          });
          return {
            options: orderBy(options, ['label'], ['asc']), // sorted
            flat,
          };
        },
      },
      { signal }
    );

const useDatasetOptions = (code: string, params?: any) => {
  return useQuery({
    queryKey: ['DATASET', code, JSON.stringify(params)],
    queryFn: fetchList(code, params),
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes - dataset options rarely change
  });
};

export default useDatasetOptions;
