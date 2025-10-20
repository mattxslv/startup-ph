import Image from 'next/image';
import React from 'react';
import { useLatestResources } from './useResources';
import Link from 'next/link';

type Props = {};

const LATEST_FILTER = {};

function LatestResources({}: Props) {
  const { isLoading, data: res } = useLatestResources(LATEST_FILTER);
  const data = (res?.list || [])[0];
  if (isLoading || !data)
    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='w-full pt-[83.87%] relative bg-slate-200 animate-pulse' />
        <div className='col-span-1 md:col-span-2'>&nbsp;</div>
      </div>
    );
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='w-full pt-[83.87%] relative bg-slate-100'>
        <Image
          fill
          className='object-center object-cover'
          src={data?.thumbnail_url || '/images/news/no-image.jpg'}
          alt=''
          sizes='346px'
        />
      </div>
      <div className='col-span-1 md:col-span-2'>
        <div className='font-bold text-xl mb-2'>{data.title}</div>
        <div className='text-xs text-slate-600 mb-4'>Posted {data.publish_date}</div>
        <div className='whitespace-pre-line text-sm text-slate-600 mb-4'>{data.sub_title}</div>
        <div>
          <Link className='text-sm font-semibold' href={`/resources/${data.id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

function LatestResources2({}: Props) {
  const { isLoading, data: res } = useLatestResources(LATEST_FILTER);
  const data = (res?.list || [])[0];
  if (isLoading || !data)
    return (
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
        <div className='col-span-1 lg:col-span-3'>
          <div className='w-full pt-[83.87%] relative bg-slate-200 animate-pulse' />
        </div>
        <div className='col-span-1 lg:col-span-2'>&nbsp;</div>
      </div>
    );
  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
      <div className='col-span-1 lg:col-span-3'>
        <div className='w-full pt-[83.87%] relative bg-slate-100'>
          <Image
            fill
            className='object-center object-cover'
            src={data?.thumbnail_url || '/images/news/no-image.jpg'}
            alt=''
            sizes='346px'
          />
        </div>
      </div>
      <div className='col-span-1 lg:col-span-2'>
        <div className='font-bold text-xl mb-2'>{data.title}</div>
        <div className='text-xs text-slate-600 mb-4'>Posted {data.publish_date}</div>
        <div className='whitespace-pre-line text-sm text-slate-600 mb-4 truncate max-h-[200px]'>
          {data.sub_title}
        </div>
        <div>
          <Link className='text-sm font-semibold' href={`/resources/${data.id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export { LatestResources2 };

export default LatestResources;
