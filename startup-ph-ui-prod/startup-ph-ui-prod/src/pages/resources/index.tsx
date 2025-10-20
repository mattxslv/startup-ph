import FeaturedGrid from '@/feature/resources/FeaturedGrid';
import { LatestResources2 } from '@/feature/resources/LatestResources';
import ResourcesLayout from '@/layout/ResourcesLayout';
import React from 'react';

type Props = {};

function ResourcesPage({}: Props) {
  return (
    <ResourcesLayout>
      <div className='bg-white p-6 rounded-none lg:rounded-lg relative'>
        <div className='font-bold text-2xl mb-6'>Latest Resources</div>
        <LatestResources2 />
      </div>
      <div className='bg-white p-6 rounded-none lg:rounded-lg relative'>
        <div className='font-bold text-2xl mb-6'>Featured Resources</div>
        <FeaturedGrid />
      </div>
    </ResourcesLayout>
  );
}

export default ResourcesPage;
