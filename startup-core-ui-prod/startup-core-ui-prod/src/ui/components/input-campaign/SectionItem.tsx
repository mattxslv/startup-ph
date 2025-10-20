/* eslint-disable @next/next/no-img-element */
import React from 'react';
import SectionRichtext from './SectionRichtext';
import Video from './Video';
import YoutubeEmbed from './YoutubeEmbed';
import { Section } from './types';

function SectionItem({ data }: { data: Section }) {
  if (data.type === 'IMAGE')
    return <img className="w-full" src={data.banner_url} alt="" />;
  if (data.type === 'RICHTEXT')
    return <SectionRichtext content={data.content} />;
  if (data.type === 'VIDEO')
    return (
      <>
        {data.source === 'custom' ? (
          <Video url={data?.video_url} placeholder="Upload Video" />
        ) : null}
        {data.source === 'youtube' && data.video_url && data.thumbnail_url ? (
          <YoutubeEmbed
            embedUrl={data.video_url}
            thumbnailUrl={data.thumbnail_url}
            title={data.video_url}
          />
        ) : null}
      </>
    );
  return null;
}

export default SectionItem;
