/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { HiUserAdd } from 'react-icons/hi';
import DevelopedBy from '../../components/partial/DevelopedBy';
import clsx from 'clsx';
import FileUploader from '@/ui/file-uploader/FileUploader';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import CustomBannerUpload from './components/CustomBannerUpload';
import StartupInfo from './components/StartupInfo';
import { useGetVerifiedPrompt } from '@/feature/home';
import VerifyBanner from './components/VerifyBanner';
import HomeSectionContainer from './components/HomeSectionContainer';
import Portfolio from './components/Portfolio';

function Home() {
  const { isLoading, data } = useMyStartup();
  const mutator = useSaveStartup();
  const isVerifiable =
    data &&
    data.logo_url &&
    (data.body || []).length > 0 &&
    data.status === 'UNVERIFIED' &&
    data.business_certificate_expiration_date &&
    data.has_funding !== null;
  const { showGetVerified, toggleGetVerified, isUnverified } = useGetVerifiedPrompt(
    data,
    isVerifiable
  );

  if (!data) {
    return (
      <div>
        <div className='relative pt-[38.31%] bg-gray-400'>
          <div className='absolute inset-0 h-full w-full flex pb-12' />
        </div>
        <div className='bg-white rounded-lg py-3 px-4 mx-4 -translate-y-12 space-y-4'>
          <div className='text-center animate-pulse text-sm py-12'>
            {isLoading ? 'Loading...' : 'Unable to load, please try again.'}
          </div>
        </div>
      </div>
    );
  }

  const canEdit = ['UNVERIFIED', 'FOR RESUBMISSION'].includes(data.status || '');

  const handleChange = (e: any) => {
    const { url } = e.target.value;
    mutator.mutate({ payload: { ...data, banner_url: url } });
  };

  return (
    <div className=' sm:w-full mx-auto'>
      <FileUploader
        className='relative z-10'
        file={data.banner_url ? { url: data.banner_url } : null}
        onChange={handleChange}
        customRender={<CustomBannerUpload banner_url={data.banner_url} />}
        accept={['image/png', 'image/jpeg', 'image/jpg']}
      />
      <div className='flex flex-col gap-8 lg:px-20'>
        <HomeSectionContainer className='md:-mt-28'>
          <StartupInfo
            data={data}
            isUnverified={isUnverified}
            isVerifiable={isVerifiable}
            canEdit={canEdit}
          />
        </HomeSectionContainer>

        <HomeSectionContainer>
          <Portfolio canEdit={canEdit} body={data?.body || []} />
        </HomeSectionContainer>
      </div>

      <VerifyBanner
        showGetVerified={showGetVerified}
        toggleGetVerified={toggleGetVerified}
        isVerifiable={isVerifiable}
      />

      {isVerifiable && (
        <button
          type='button'
          onClick={() => toggleGetVerified(!showGetVerified)}
          className={clsx(
            'fixed right-10 bottom-20 lg:bottom-10 bg-black z-30 flex items-center justify-center flex-col w-16 h-16 p-3 transition-all ease-in-out delay-500 opacity-1 rounded-full shadow-md duration-500',
            showGetVerified && 'opacity-0 pointer-events-none'
          )}
        >
          <HiUserAdd className='w-6 h-6 text-primary' />
          <small className='text-white text-xs font-semibold'>Verify</small>
        </button>
      )}
      <DevelopedBy />
    </div>
  );
}

export default Home;
