import Button from '@/ui/button/Button';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useStartupList } from './hooks/useStartups';
import StartupList from './components/StartupList';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { showFilterDrawer } from './components/FilterDrawer';
import { TStartup } from '../startup/types';

export interface IFilter {
  page: number;
  q: string;
  per_page: number;
  order_by: string;
  status_by: string;
  sector: string;
  development_phase: string;
}

const INIT_FILTER = {
  per_page: 15,
  page: 1,
  order_by: 'name',
  status_by: '',
  q: '',
  sector: '',
  development_phase: '',
};

const Startups = () => {
  const [filter, setFilter] = useState<IFilter>(INIT_FILTER);
  const { isFetching, data } = useStartupList(filter);
  const [startups, setStartups] = useState<Array<Partial<TStartup>>>([]);
  const [hasMore, setHasMore] = useState(true);

  // Handle search reset
  useEffect(() => {
    if (filter.q !== undefined) {
      setStartups([]); // Clear the list
      setFilter((prev) => ({ ...prev, page: 1 })); // Reset page
    }
  }, [filter.q, filter.sector, filter.development_phase]);

  // Handle data updates
  useEffect(() => {
    if (!data?.list) return;
    if (data.list.length === 0) {
      setHasMore(false);
      return;
    }
    setStartups((prev) => (filter.page === 1 ? data.list : [...prev, ...data.list]));
    setHasMore(data.list.length === filter.per_page);
  }, [data?.list, filter.page]);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      setFilter((prev) => ({ ...prev, q: searchValue }));
    }, 500), // 500ms delay
    []
  );

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedSearch(value);
  };

  const onLoadMore = () => {
    setFilter((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleSubmit = (payload: IFilter) => {
    setFilter((prev) => ({
      ...prev,
      ...payload,
    }));
  };

  return (
    <div className='px-[1rem] md:px-[4rem]'>
      <div className='bg-white p-6 rounded-none lg:rounded-lg relative'>
        <div className='font-bold text-2xl mb-6'>Startups</div>

        <div className='flex items-center gap-5 mb-3'>
          <input
            name='q'
            className={clsx(
              'form-input w-full h-11 rounded',
              'text-sm leading-4',
              'placeholder:text-disabled focus:ring-outline-active focus:ring-2 focus:border-transparent',
              'disabled:bg-fill-disabled disabled:text-disabled'
            )}
            placeholder='Search...'
            onChange={handleInputChange}
          />
          <Button variant='primary' onClick={() => showFilterDrawer(handleSubmit, filter)}>
            Advance Filter
          </Button>
        </div>

        <StartupList
          startups={startups}
          isLoading={isFetching}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
        />
      </div>
    </div>
  );
};

export default Startups;
