/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { HiUserAdd } from 'react-icons/hi';

import clsx from 'clsx';
// import FileUploader from '@/ui/file-uploader/FileUploader';
import useFileUploader from '@/hooks/useFileUploader';
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
  const [uploader, progress] = useFileUploader();
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

  // Debug logging
  console.log('🏠 Home component render:', {
    canEdit,
    status: data.status,
    isLoading: uploader.isLoading,
    banner_url: data.banner_url
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🎯 Banner upload clicked, canEdit:', canEdit);
    console.log('🎯 Startup status:', data.status);
    console.log('🎯 File input event:', e.target.files);
    
    const file = e.target.files?.[0];
    if (!file) {
      console.log('🚨 No file selected');
      return;
    }

    console.log('📁 Selected file:', file.name, file.size, file.type);

    // Validate file size (50MB)
    if (file.size > 52428800) {
      alert('File size must be less than 50MB');
      return;
    }

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Only PNG, JPG, and JPEG files are allowed');
      return;
    }

    console.log('🚀 Starting file upload...');
    // Upload file
    uploader.mutate(
      { payload: { file } },
      {
        onSuccess: (url: string) => {
          console.log('✅ Upload successful, URL:', url);
          console.log('🔄 Updating startup with new banner URL...');
          console.log('📊 Current data:', data);
          console.log('🆕 New data will be:', { ...data, banner_url: url });
          
          mutator.mutate(
            { payload: { ...data, banner_url: url } },
            {
              onSuccess: (response) => {
                console.log('✅ Startup update successful:', response);
              },
              onError: (updateError) => {
                console.error('❌ Startup update failed:', updateError);
                alert('Failed to update startup. Please try again.');
              }
            }
          );
        },
        onError: (error) => {
          console.error('❌ Upload failed:', error);
          alert('Upload failed. Please try again.');
        },
      }
    );
  };

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='relative z-10 -mt-4'>
        <input
          type='file'
          accept='image/png,image/jpeg,image/jpg'
          onChange={handleChange}
          disabled={!canEdit || uploader.isLoading}
          className='hidden'
          id='banner-upload'
        />
        <div 
          className={canEdit ? 'cursor-pointer' : 'cursor-default'}
          onClick={() => {
            console.log('🏷️ Div clicked, canEdit:', canEdit);
            if (canEdit && !uploader.isLoading) {
              console.log('🏷️ Triggering file input click');
              document.getElementById('banner-upload')?.click();
            } else {
              console.log('🏷️ Upload disabled - canEdit:', canEdit, 'loading:', uploader.isLoading);
            }
          }}
        >
          <CustomBannerUpload banner_url={data.banner_url} isUploading={uploader.isLoading} progress={progress} />
        </div>
      </div>
      <div className='flex flex-col gap-6 lg:px-20 pb-10'>
        <HomeSectionContainer className='md:-mt-28 shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <StartupInfo
            data={data}
            isUnverified={isUnverified}
            isVerifiable={isVerifiable}
            canEdit={canEdit}
          />
        </HomeSectionContainer>

        <HomeSectionContainer className='shadow-md hover:shadow-lg transition-shadow duration-300'>
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
            'fixed right-10 bottom-20 lg:bottom-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 z-30 flex items-center justify-center flex-col w-16 h-16 p-3 transition-all ease-in-out opacity-1 rounded-full shadow-lg hover:shadow-2xl duration-300 hover:scale-110',
            showGetVerified && 'opacity-0 pointer-events-none'
          )}
        >
          <HiUserAdd className='w-6 h-6 text-white' />
          <small className='text-white text-xs font-semibold'>Verify</small>
        </button>
      )}
    </div>
  );
}

export default Home;
