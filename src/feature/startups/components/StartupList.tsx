import { TStartup } from '@/feature/startup/types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface StartupListProps {
  startups: Array<Partial<TStartup>>;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const StartupList: React.FC<StartupListProps> = ({ startups, isLoading, hasMore, onLoadMore }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
    delay: 800,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [inView]);

  return (
    <div className='min-h-screen'>
      {/* Add minimum height */}
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {startups.map((startup, index) => (
          <a
            href={`/startups/${startup.slug}`}
            key={index}
            className='rounded-lg border flex flex-col gap-8 p-8 text-center hover:bg-blue-50 transition duration-300'
          >
            <img
              src={startup.logo_url || '/images/news/no-image.jpg'}
              className='w-20 mx-auto'
              alt={startup.name}
            />

            <div className='flex flex-col gap-2'>
              <p className='font-semibold'>{startup.name}</p>
              <p className='text-sm'>Founding Year: {startup.founding_year}</p>
            </div>

            <small className='text-muted line-clamp-5'>{startup.description}</small>
          </a>
        ))}
      </div>

      {/* Separate loading indicator */}
      {isLoading && (
        <>
          <div className='w-full flex justify-center p-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500' />
          </div>
        </>
      )}

      {!hasMore && !isLoading && (
        <div className='w-full text-center text-gray-500 p-4'>No more startups to load</div>
      )}

      {/* Make sure this element is visible and has height */}
      <div ref={ref} style={{ height: '20px', visibility: 'hidden' }} className='w-full my-4' />
    </div>
  );
};

export default StartupList;
