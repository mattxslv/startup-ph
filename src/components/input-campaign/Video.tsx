import React from 'react';

type Props = {
  url?: string;
  placeholder: string;
};

function Video({ url, placeholder }: Props) {
  return (
    <div className='relative pt-[56.25%] bg-gray-400'>
      <div className='absolute inset-0 h-full w-full flex'>
        {url ? (
          <video className='h-full w-full' controls>
            <source src={url} type='video/mp4' />
            You browser does not support the <code>video</code> element. However, you can
            <a href={url}>download</a>
            the MP4 version of the video.
          </video>
        ) : (
          <span className='m-auto text-xl text-center font-light tracking-tighter text-white'>
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
}

export default Video;
