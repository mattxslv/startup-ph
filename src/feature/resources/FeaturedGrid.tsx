import React from 'react';
import { useFeaturedResourcesList } from './useResources';
import ResourcesCard from './ResourcesCard';

type Props = {};

function FeaturedGrid({}: Props) {
  const { data } = useFeaturedResourcesList({ 'tags[]': 'Featured' });
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
      {(data?.list || []).map((item) => (
        <ResourcesCard key={item.id} data={item} />
      ))}
    </div>
  );
}

export default FeaturedGrid;
