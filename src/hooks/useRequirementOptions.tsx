import { ws } from '@/lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

export interface IFlatOption {
  id: string;
  name: string;
  template_label?: string;
  template_url?: string;
}

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<{ options: TSelectOption[]; flat: Record<string, IFlatOption> }>(
      {
        url: '/api/v1/common/requirements',
        params: { per_page: 1000, ...params },
        transform: ({ data }) => {
          const flat: Record<string, IFlatOption> = {};
          const options = (data?.data ?? []).map((row: any) => {
            flat[String(row?.id)] = {
              id: String(row?.id),
              name: row?.label,
              template_label: row?.template_label,
              template_url: row?.template_url,
            };
            return {
              label: row?.label,
              value: String(row?.id),
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

const useRequirementOptions = (params?: any) => {
  return useQuery({
    queryKey: ['LOOKUPS/requirement', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default useRequirementOptions;
