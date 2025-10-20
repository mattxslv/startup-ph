import { useMemo } from 'react';
import { ISelectOption } from 'ui/forms/types';
import useAddressList from './useAddressList';

const useAddressOptions = (
  type: string,
  FILTER: any
): [boolean, ISelectOption[], Record<string, string>] => {
  const { isFetching, data } = useAddressList(type, FILTER);
  const [options, flatNames] = useMemo(() => {
    const flat: Record<string, string> = {};
    const opt = (data?.list ?? []).map((item) => {
      if (item.name) flat[item.name] = item.name;
      return {
        label: item.name,
        value: item.code,
      };
    });
    return [opt, flat];
  }, [data?.list]);
  return [isFetching, options, flatNames];
};

export default useAddressOptions;
