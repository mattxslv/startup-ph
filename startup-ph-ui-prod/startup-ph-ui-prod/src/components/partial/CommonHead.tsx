import Head from 'next/head'
import React from 'react'

type Props = {}

function CommonHead({}: Props) {
  return (
    <Head>
      <title>Startup PH</title>
      <meta name="title" content="Startup PH"></meta>
      <meta name="description" content="Introduce your startup" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="icon" href="/images/favicon.ico" />

      <meta property="og:image" content="/banner.png"></meta>
      <meta property="twitter:image" content="/banner.png"></meta>
    </Head>
  )
}

type CustomHeadProps = {
  title?: string
  description?: string
  banner?: string
}

export function CustomHead(props: CustomHeadProps) {
  return (
    <Head>
      <title>{props.title || 'Startup PH'}</title>
      <meta name="title" content={props.title || 'Startup PH'}></meta>
      <meta name="description" content={props.description || 'Startup PH'} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="icon" href="/images/favicon.ico" />

      <meta property="og:image" content={props?.banner || "/banner.png"}></meta>
      <meta property="twitter:image" content={props?.banner || "/banner.png"}></meta>
    </Head>
  )
}

export default CommonHead