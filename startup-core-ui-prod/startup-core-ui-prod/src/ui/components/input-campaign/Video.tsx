import React from 'react';

type Props = {
  url?: string;
  placeholder: string;
};

function Video({ url, placeholder }: Props) {
  if (!url)
    return (
      <div className="m-auto text-xl text-center font-light tracking-tighter text-white w-full">
        {placeholder}
      </div>
    );

  return (
    <video className="h-full w-full" controls>
      <source src={url} type="video/mp4" />
      You browser does not support the <code>video</code> element. However, you
      can
      <a href={url}>download</a>
      the MP4 version of the video.
    </video>
  );
}

export default Video;
