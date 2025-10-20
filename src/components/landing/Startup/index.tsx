import React, { useEffect, useMemo } from 'react';
// import CategoryFilter from './CategoryFilter'
import AOS from 'aos';
import StartupCard, { StartupCardLoader } from './StartupCard';
import useFeaturedList from './useFeaturedList';
import { useInfiniteStartupList } from '@/hooks/useFetchStartup';

type Props = {};

export const MAP_COLOR_BY_INDEX = [
  '#FFF7ED',
  '#F0FDF4',
  '#F0F9FF',
  '#F5F3FF',
  '#FFFBEB',
  '#FDF2F8',
];

function Startup({}: Props) {
  const { isFetching, data } = useFeaturedList();
  const listLength = (data?.list || []).length;
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }, [listLength]);
  if (listLength < 1) return null;
  return (
    <div className='container mx-auto'>
      <div className='text-center mb-7'>
        <h1 className='text-2xl md:text-5xl font-bold text-dark'>Featured Startups</h1>
      </div>
      {/* <CategoryFilter /> */}
      {(data?.list || []).length < 1 || false ? (
        <>
          {isFetching ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10 mt-10'>
              <StartupCardLoader />
              <StartupCardLoader />
              <StartupCardLoader />
              <StartupCardLoader />
              <StartupCardLoader />
              <StartupCardLoader />
            </div>
          ) : (
            <div className='relative'>
              <div className='absolute inset-0 h-full w-full bg-white/60 z-10 text-center p-10'>
                <div className='text-2xl italic text-muted'>There are no featured startup</div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10 mt-10'>
                <StartupCardLoader />
                <StartupCardLoader />
                <StartupCardLoader />
                <StartupCardLoader />
                <StartupCardLoader />
                <StartupCardLoader />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10 mt-10'>
          {(data?.list || []).map((item, i) => (
            <StartupCard
              key={item.id}
              icon={item.icon_url}
              label={item.name}
              description={item.short_description || item.description}
              background={MAP_COLOR_BY_INDEX[i % MAP_COLOR_BY_INDEX.length]}
              aos-offset='0'
              data-aos-delay='0'
              data-aos='fade'
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Startup;
