/* eslint-disable @next/next/no-img-element */
import ViewCampaign from '@/components/input-campaign/ViewCampaign';
import { IResources, fetchResourcesById } from '@/feature/resources/useResources';
import ResourcesLayout from '@/layout/ResourcesLayout';
import BadgeArray from '@/ui/badge/BadgeArray';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

type Props = {
  data?: IResources;
  pageNotFound?: boolean;
};

function ResourcesItemPage({ data, pageNotFound }: Props) {
  const title = `Startup PH Resources`;
  const description = `${data?.title}`;
  if (!data || pageNotFound) {
    return (
      <>
        <Head>
          <title>Not Found - Startup PH</title>
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
          <link rel='icon' href='/images/favicon.ico' />
        </Head>
        <div className='bg-gradient-to-r from-[#F4FAFF] to-[#E4EAFF] min-h-screen flex-grow'>
          <div className='container mx-auto text-center font-bold text-2xl'>Page Not found</div>
        </div>
      </>
    );
  }
  return (
    <ResourcesLayout>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        {data?.thumbnail_url ? <meta property='og:image' content={data?.thumbnail_url} /> : null}
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        {data?.thumbnail_url ? (
          <meta property='twitter:image' content={data?.thumbnail_url} />
        ) : null}
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <link rel='icon' href='/images/favicon.ico' />
      </Head>
      <div>
        <div className='bg-white p-6 rounded-none lg:rounded-lg relative'>
          <div className='text-lg font-bold'>{data?.title}</div>
          <div className='text-sm font-semibold mb-6'>Posted {data?.publish_date}</div>
          <div>
            {Array.isArray(data?.body) ? (
              <ViewCampaign
                data={data?.body}
                message='Stay tuned! This exciting resources article is on its way. Check back soon for the full story.'
              />
            ) : null}
          </div>
          {/* <hr /> */}
          <div className='mt-4'>
            <div className='text-xs font-semibold text-description mb-2'>Tags:</div>
            <BadgeArray list={data?.tags} />
          </div>
        </div>
      </div>
    </ResourcesLayout>
  );
}

export const getStaticPaths: GetStaticPaths = (context) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (typeof context?.params?.id !== 'string') {
    return {
      props: {
        pageNotFound: true,
      },
      revalidate: 10,
    };
  }
  const data = await fetchResourcesById(context?.params?.id);
  if (!data) return { props: { pageNotFound: true }, revalidate: 10 };
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export default ResourcesItemPage;
