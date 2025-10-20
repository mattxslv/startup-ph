import { LatestNews2 } from '@/feature/news/LatestNews';
import FeaturedGrid from '@/feature/news/FeaturedGrid';
import NewsLayout from '@/layout/NewsLayout';
import React from 'react';
import { useFeaturedNewsList } from '@/feature/news/useNews';
import _ from 'lodash';

type Props = {};

function NewsPage({}: Props) {
  const { data } = useFeaturedNewsList({ 'tags[]': 'Featured' });
  return (
    <NewsLayout>
      <div className='bg-white p-6 rounded-none lg:rounded-lg relative'>
        <div className='font-bold text-2xl mb-6'>Latest News</div>
        <LatestNews2 />
      </div>

      {!data?.list || _.isEmpty(data.list) ? (
        <></>
      ) : (
        <div className='bg-white p-6 rounded-none lg:rounded-lg relative'>
          <div className='font-bold text-2xl mb-6'>Featured News</div>
          <FeaturedGrid />
        </div>
      )}
    </NewsLayout>
  );
}

export default NewsPage;
