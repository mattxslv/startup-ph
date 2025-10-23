import React from 'react';
import Image from 'next/image';
import FeaturedNewsCard from '@/feature/resources/FeaturedNewsCard';
import { LatestNews2 } from '@/feature/news/LatestNews';
import { useFeaturedResourcesList } from '@/feature/resources/useResources';
import _ from 'lodash';

type Props = {};

function NewsFeed({}: Props) {
  const { data } = useFeaturedResourcesList({ per_page: 3, 'tags[]': 'Featured' });
  return (
    <div className='relative'>
      <div className='container mx-auto py-10 md:py-28 space-y-8 md:space-y-10'>
        <div
          className='bg-white p-6 rounded-none lg:rounded-lg shadow-lg relative'
          data-aos-delay='0'
          disabled-data-aos='fade-up'
        >
          <div className='h-20 md:h-28 w-20 md:w-28 absolute top-0 right-0 md:right-3 translate-y-[-50%]'>
            <Image fill src='/images/news/paper-clip.png' sizes='112px' alt='' />
          </div>
          <div className='font-bold text-2xl mb-6'>Latest News</div>
          <LatestNews2 />
        </div>
        {!data?.list || _.isEmpty(data.list) ? (
          <></>
        ) : (
          <div
            className='bg-white p-6 rounded-none lg:rounded-lg'
            data-aos-delay='0'
            disabled-data-aos='fade-up'
          >
            <div className='font-bold text-2xl mb-6'>Featured News</div>
            <FeaturedNewsCard />
          </div>
        )}
      </div>
      <div className='absolute bottom-[20%] right-[50%] translate-x-[160%] z-[-1] h-[228px] w-[228px] rounded-full bg-highlight blur-[190px] opacity-60' />
      <div className='absolute bottom-[10%] left-[50%] translate-x-[-160%] z-[-1] h-[228px] w-[228px] rounded-full bg-[#F472B6] blur-[190px] opacity-60' />
      <div className='absolute top-[-10%] left-[50%] translate-x-[-160%] z-[-1] h-[228px] w-[228px] rounded-full bg-[#A78BFA] blur-[190px] opacity-60' />
    </div>
  );
}

export default NewsFeed;
