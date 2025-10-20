import { useMemo } from 'react';
import { ISelectOption } from 'ui/forms/types';
import useRoleList from './useRoleList';

const useRoleOptions = (): [
  boolean,
  ISelectOption[],
  Record<string, string>
] => {
  const { isFetching, data } = useRoleList();
  const [options, flatNames] = useMemo(() => {
    const flat: Record<string, string> = {};
    const opt = (data?.list ?? []).map((item) => {
      if (item.name) flat[item.name] = item.name;
      return {
        label: item.name,
        value: String(item.id),
      };
    });
    return [opt, flat];
  }, [data?.list]);
  return [isFetching, options, flatNames];
};

export default useRoleOptions;
