import { ws } from '@/lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

export interface IFlatOption {
  name: string;
}

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<{ options: TSelectOption[]; flat: Record<string, IFlatOption> }>(
      {
        url: '/api/v1/common/sectors',
        params: { per_page: 1000, ...params },
        transform: ({ data }) => {
          const flat: Record<string, IFlatOption> = {};
          const options = (data?.data ?? []).map((row: any) => {
            flat[row?.name] = {
              name: row?.name,
            };
            return {
              label: row?.name,
              value: row?.name,
            };
          });
          return {
            options,
            flat,
          };
        },
      },
      { signal }
    );

const useSectorOptions = (params?: any) => {
  return useQuery({
    queryKey: ['LOOKUPS/sector', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default useSectorOptions;
