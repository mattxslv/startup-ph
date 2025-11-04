import { UseQueryResult } from '@tanstack/react-query';
import { TStartUp } from 'features/startup/startup';
import { isEmpty } from 'lodash';
import { useState, Children, useEffect } from 'react';
import { IPagination } from 'types';
import { Badge, Pagination } from 'ui/components';

interface IFilter {
  page: number;
  q: string;
  status?: TStartUp['status'];
  status_by: 'asc' | 'desc';
}

export const INIT_FILTER_STATE: IFilter = {
  page: 1,
  q: '',
  status_by: 'desc',
};

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

type Props<T> = {
  listItem: (
    t: T,
    onSelect: (selected?: T) => void,
    isSelected: boolean
  ) => React.ReactNode;
  hook: (
    params: any
  ) => UseQueryResult<{ list: Array<T>; pager?: IPagination }, unknown>;
  action?: React.ReactNode;
  children: ({
    selected,
    resetSelected,
  }: {
    selected?: T;
    resetSelected: () => void;
  }) => React.ReactNode;
  filter?: any;
  onFilterChange?: React.Dispatch<React.SetStateAction<any>>;
  badgeFilter?: Array<{ label: string; value: string | number }>;
  customFilters?: React.ReactNode;
};

function ListView<T>({
  children,
  hook: useHook,
  listItem,
  action,
  filter = INIT_FILTER_STATE,
  onFilterChange,
  badgeFilter,
  customFilters,
}: Props<T>) {
  const [keyword, setKeyword] = useState('');
  const { isLoading, data } = useHook(filter);
  const [selected, setSelected] = useState<T | undefined>(
    data?.list[0] || undefined
  );
  const debouncedValue = useDebounce(keyword);

  useEffect(() => {
    if (debouncedValue) {
      onFilterChange?.({ ...filter, q: debouncedValue });
    } else {
      onFilterChange?.({ ...filter, q: '' });
    }
  }, [debouncedValue]);

  useEffect(() => {
    // if (!selected) {
    //   setSelected(data?.list?.[0]);
    // }
    setSelected(data?.list[0] || undefined);
  }, [JSON.stringify(filter)]);

  const resetSelected = () => setSelected(undefined);

  const handleSelectBadge = (status: any) => {
    if (filter?.status === status) {
      const { status, ...rest } = filter;
      onFilterChange?.(rest);
      return;
    }
    onFilterChange?.({ ...filter, status });
  };

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden rounded-lg">
      <div className="w-full md:w-72 relative md:absolute top-0 h-full border-r bg-white flex flex-col divide-y">
        <div className="relative">
          <input
            className="py-3 px-3 w-full focus:outline-none pr-16"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          {keyword ? (
            <button
              className="text-primary-base font-semibold absolute top-0 right-0 py-3.5 mr-4 underline text-sm"
              type="button"
              onClick={() => {
                setKeyword('');
              }}
            >
              Clear
            </button>
          ) : null}
        </div>

        {!isEmpty(badgeFilter) && (
          <div className="flex flex-wrap justify-center gap-3 p-3">
            {badgeFilter?.map((item) => (
              <button
                key={JSON.stringify(item)}
                onClick={() => handleSelectBadge(item.value)}
              >
                <Badge
                  className="text-gray-600"
                  variant={filter?.status === item.value ? 'primary' : 'base'}
                >
                  {item.label}
                </Badge>
              </button>
            ))}
            {/* <Badge className='text-gray-600 cursor-pointer'>Verified</Badge>
            <Badge className='text-gray-600 cursor-pointer'>For Resubmission</Badge>
            <Badge className='text-gray-600 cursor-pointer'>Rejected</Badge> */}
          </div>
        )}

        {customFilters}

        <div className="relative flex-1 min-h-[200px]">
          <div className="absolute inset-0 overflow-auto flex flex-col m-2">
            {!data || data.list?.length < 1 ? (
              <div className="text-center py-2">
                {isLoading ? 'Loading...' : 'There are no items.'}
              </div>
            ) : (
              Children.toArray(
                data.list?.map((item) =>
                  listItem(item, setSelected, item === selected)
                )
              )
            )}
          </div>
        </div>
        {action ? <div className="p-3">{action}</div> : null}

        <div className="px-5 py-2">
          <Pagination value={data?.pager} onChange={onFilterChange} />
        </div>
      </div>

      <div className="md:ml-72 flex-1 relative bg-white">
        <div className="absolute inset-0 overflow-auto flex flex-col p-6">
          {children({ selected, resetSelected })}
        </div>
      </div>
    </div>
  );
}

export default ListView;
