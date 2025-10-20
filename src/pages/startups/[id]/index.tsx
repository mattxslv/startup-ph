/* eslint-disable @next/next/no-img-element */
import { CustomHead } from '@/components/partial/CommonHead';
import DevelopedBy from '@/components/partial/DevelopedBy';
import { fetchStartupsById } from '@/feature/startups/hooks/useStartups';
import StartupPage from '@/feature/startups/components/Startup';
import HomeLayout from '@/layout/HomeLayout';
import Button from '@/ui/button/Button';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { TStartup } from '@/feature/startup/types';
import HomeSectionContainer from '@/feature/home/components/HomeSectionContainer';
import StartupInfo from '@/feature/home/components/StartupInfo';
import Portfolio from '@/feature/home/components/Portfolio';

type Props = {
  data: TStartup;
};

function StartupsItemPage({ data }: Props) {
  const router = useRouter();
  if (!data) return <div>-</div>;
  return (
    <HomeLayout noHeader>
      <CustomHead
        title={`${data.name} - Startup PH`}
        description={data.description}
        banner={data.logo_url}
      />
      <div className='container mx-auto w-full flex-1'>
        <Button
          className='mr-auto mb-5'
          onClick={() => {
            router.replace('/startups');
          }}
          variant='link'
          leading={<HiArrowLeft />}
        >
          Back to All Startups
        </Button>

        <div className='flex flex-col gap-8 lg:px-20'>
          <HomeSectionContainer>
            <StartupInfo
              data={data}
              isUnverified={false}
              isVerifiable={false}
              canEdit={false}
              sections={['basic', 'sector', 'contact', 'social']}
              hasBanner={false}
            />
          </HomeSectionContainer>

          <HomeSectionContainer>
            <Portfolio canEdit={false} body={data?.body || []} />
          </HomeSectionContainer>
        </div>
      </div>
      <div className='w-full'>
        <DevelopedBy />
      </div>
    </HomeLayout>
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
  const data = await fetchStartupsById(context?.params?.id);
  if (!data) return { props: { pageNotFound: true }, revalidate: 10 };
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export default StartupsItemPage;
