import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { ws } from 'lib';
import { useMemo } from 'react';
import { ISelectOption } from 'ui/forms/types';

const fetchList =
  (params?: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<string[]>(
      {
        url: '/api/mng/acl/permission',
        params,
        transform: ({ data }) => {
          const sorted = (data?.data ?? []).map((item: any) => item).sort();
          return sorted;
        },
      },
      { signal }
    );

const usePermissionOptions = (): [
  boolean,
  ISelectOption[],
  Record<string, string>
] => {
  const { isFetching, data } = useQuery({
    queryKey: ['ACL/permissions'],
    queryFn: fetchList(),
  });
  const [options, flatNames] = useMemo(() => {
    const flat: Record<string, string> = {};
    const opt = (data ?? []).map((item) => {
      flat[`${item}`] = item;
      return {
        label: item,
        value: item,
      };
    });
    return [opt, flat];
  }, [data]);
  return [isFetching, options, flatNames];
};

export default usePermissionOptions;
