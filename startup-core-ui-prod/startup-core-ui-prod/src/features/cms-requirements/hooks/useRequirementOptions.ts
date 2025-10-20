import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { ws } from 'lib';
import { useMemo } from 'react';
import { ISelectOption } from 'ui/forms/types';

type TFlat = {
  label: string;
  value: string;
  type: string;
};

const fetchList =
  (params?: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<TFlat[]>(
      {
        url: '/api/v2/administrator/misc/requirements',
        params,
        transform: ({ data }) => {
          const sorted = (data?.data ?? []).map((item: any) => ({
            label: item.name,
            type: item.type,
            value: String(item.id),
          }));
          // .sort();
          return sorted;
        },
      },
      { signal }
    );

const useRequirementOptions = (
  params?: any
): [boolean, ISelectOption[], Record<string, TFlat>] => {
  const { isFetching, data } = useQuery({
    queryKey: ['REQUIREMENT/options', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
  const [options, flatNames] = useMemo(() => {
    const flat: Record<string, TFlat> = {};
    const opt = (data ?? []).map((item) => {
      flat[`${item.value}`] = item;
      return {
        label: item.label,
        value: item.value,
      };
    });
    return [opt, flat];
  }, [data]);
  return [isFetching, options, flatNames];
};

export default useRequirementOptions;
