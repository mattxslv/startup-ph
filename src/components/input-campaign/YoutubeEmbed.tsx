/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {
  embedUrl: string
  thumbnailUrl: string
  title: string
}

function YoutubeEmbed({ embedUrl, thumbnailUrl, title }: Props) {
  return (
    <div className="relative pt-[56.25%] z-10">
      <iframe
        className="absolute inset-0 w-full h-full z-20"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <img
        className="absolute !my-0 inset-0 h-full w-full z-10 object-center object-cover"
        src={thumbnailUrl}
        alt={title}
      />
      ;
    </div>
  )
}

export default YoutubeEmbed