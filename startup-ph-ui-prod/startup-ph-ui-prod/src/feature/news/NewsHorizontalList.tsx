import React, { useState } from 'react';
import { useNewsList } from './useNews';
import { NewsCardHorizontal } from './NewsCard';
import useDatasetOptions from '../dataset/useDatasetOptions';
import Badge from '@/ui/badge/Badge';

type Props = {};

interface Filter {
  page: number;
  'tags[]': string | number;
}

function NewsHorizontalList({}: Props) {
  const [filter, setFilter] = useState<Filter>({ page: 1, 'tags[]': '' });
  const { isLoading, data } = useNewsList(filter);
  const { data: tagOptions } = useDatasetOptions('news-tags');
  const list = data?.list || [];
  return (
    <div>
      {(tagOptions?.options || []).length > 1 ? (
        <div className='mb-6'>
          <div className='flex flex-wrap -mb-2'>
            <button className='mb-2 mr-2' onClick={() => setFilter({ ...filter, 'tags[]': '' })}>
              <Badge variant={filter['tags[]'] === '' ? 'primary' : 'base'}>All</Badge>
            </button>
            {(tagOptions?.options || []).map((item) => (
              <button
                key={item.value}
                className='mb-2 mr-2'
                onClick={() => setFilter({ ...filter, 'tags[]': item.value })}
              >
                <Badge variant={filter['tags[]'] === item.value ? 'primary' : 'base'}>
                  {item.label}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <div className='grid grid-cols-1 gap-7'>
        {list.length < 1 ? (
          <div className='text-center text-sm text-slate-500 mt-3 mb-7'>
            {isLoading ? 'Loading...' : 'There are no items.'}
          </div>
        ) : (
          list.map((item) => <NewsCardHorizontal key={item.id} data={item} />)
        )}
      </div>
    </div>
  );
}

export default NewsHorizontalList;
