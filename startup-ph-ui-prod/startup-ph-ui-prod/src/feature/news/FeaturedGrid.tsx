import React from 'react';
import { useFeaturedNewsList } from './useNews';
import NewsCard from './NewsCard';

type Props = {};

function FeaturedGrid({}: Props) {
  const { data } = useFeaturedNewsList({ 'tags[]': 'Featured' });
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
      {(data?.list || []).map((item) => (
        <NewsCard key={item.id} data={item} />
      ))}
    </div>
  );
}

export default FeaturedGrid;
