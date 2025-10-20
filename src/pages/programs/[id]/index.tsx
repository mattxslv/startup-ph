/* eslint-disable @next/next/no-img-element */
import { CustomHead } from '@/components/partial/CommonHead';
import DevelopedBy from '@/components/partial/DevelopedBy';
import { Program, fetchProgramById } from '@/feature/program';
import { TProgram } from '@/feature/program/hooks/useProgram';
import HomeLayout from '@/layout/HomeLayout';
import Button from '@/ui/button/Button';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';

type Props = {
  data: TProgram;
};

function ProgramPage({ data }: Props) {
  const router = useRouter();
  if (!data) return <div>-</div>;
  return (
    <HomeLayout noHeader>
      <CustomHead
        title={`${data.name} - Startup PH`}
        description={data.description}
        banner={data.thumbnail_url}
      />
      <div className='container mx-auto w-full flex-1'>
        <div className='flex justify-start w-full mb-4 -mx-6'>
          <Button
            onClick={() => {
              router.replace('/programs');
            }}
            variant='link'
            leading={<HiArrowLeft />}
          >
            Back to All Programs
          </Button>
        </div>
        <div className='bg-white p-6 rounded-none lg:rounded-lg relative mb-4'>
          <Program data={data} />
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
  const data = await fetchProgramById(context?.params?.id);
  if (!data) return { props: { pageNotFound: true }, revalidate: 10 };
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export default ProgramPage;
