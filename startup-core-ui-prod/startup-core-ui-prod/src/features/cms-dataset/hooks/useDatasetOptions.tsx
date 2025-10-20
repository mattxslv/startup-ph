import { useMemo } from 'react';
import { ISelectOption } from 'ui/forms/types';
import useDatasetList from './useDatasetList';

const FILTER = { per_page: 1000 };

const useDatasetOptions = (
  code: string
): [boolean, ISelectOption[], Record<string, string>] => {
  const { isFetching, data } = useDatasetList(code, FILTER);
  const [options, flatNames] = useMemo(() => {
    const flat: Record<string, string> = {};
    const opt = (data?.list ?? []).map((item) => {
      if (item.label) flat[item.label] = item.label;
      return {
        label: item.label,
        value: item.label,
      };
    });
    return [opt, flat];
  }, [data?.list]);
  return [isFetching, options, flatNames];
};

export default useDatasetOptions;
