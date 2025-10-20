import React from 'react';
import { INews } from './useNews';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  data: INews;
  truncateTitle?: boolean;
};

function NewsCard({ truncateTitle = false, data }: Props) {
  return (
    <div className='flex flex-col'>
      <div className='w-full pt-[56.02%] bg-slate-100 rounded-lg relative mb-6'>
        {data.thumbnail_url ? (
          <Image
            className='object-center object-cover'
            src={data.thumbnail_url}
            fill
            sizes='400px'
            alt=''
          />
        ) : (
          <Image
            className='object-center object-cover'
            src='/images/news/no-image.jpg'
            fill
            sizes='400px'
            alt=''
          />
        )}
      </div>
      <div className='min-h-[116px] flex flex-col flex-1'>
        <div
          className={clsx(
            'mb-2 text-sm font-semibold text-slate-600',
            truncateTitle ? 'line-clamp-2 ' : ''
          )}
        >
          {data.title}
        </div>
        <div className='mb-auto text-[11px] text-slate-500'>Posted {data.publish_date}</div>
        <div>
          <Link className='text-sm font-semibold' href={`/news/${data.id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

function NewsCardHorizontal({ data }: Props) {
  return (
    <div className='flex'>
      <div className='pr-4'>
        <div className='w-[120px] pt-[70.83%] bg-slate-100 rounded-lg overflow-hidden relative'>
          {data.thumbnail_url ? (
            <Image
              className='object-center object-cover'
              src={data.thumbnail_url}
              fill
              sizes='120px'
              alt=''
            />
          ) : (
            <Image
              className='object-center object-cover'
              src='/images/news/no-image.jpg'
              fill
              sizes='400px'
              alt=''
            />
          )}
        </div>
      </div>
      <div className='flex-1 min-w-0'>
        <div className='mb-2 text-sm font-semibold text-slate-600 line-clamp-2'>{data.title}</div>
        <div className='mb-auto text-[11px] text-slate-500'>Posted {data.publish_date}</div>
        <div>
          <Link className='text-sm font-semibold' href={`/news/${data.id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export { NewsCardHorizontal };

export default NewsCard;
