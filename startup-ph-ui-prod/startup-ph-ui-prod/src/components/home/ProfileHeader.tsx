import React, { useEffect, useRef } from 'react';
import useProfile from '@/hooks/useProfile';
import { HiCamera, HiUser } from 'react-icons/hi';
import useInputFile from '@/hooks/useInputFile';
import clsx from 'clsx';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import Toast from '@/ui/toast/Toast';
import Image from 'next/image';
import { TabItem } from '../tab';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';

type Props = {};

function ProfileHeader({}: Props) {
  const { data: profile } = useProfile();
  const { data: startup } = useMyStartup();
  const mutator = useUpdateProfile();

  // MAKES SURE THAT THE PROFILE IS LATEST STATE
  const profileRef = useRef(profile);
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);
  const [input, progress] = useInputFile((photo_url: string) => {
    mutator.mutate(
      { payload: { ...profileRef.current, photo_url } },
      {
        onSuccess: () => {
          Toast.success('Updated!');
        },
      }
    );
  });
  return (
    <div className='p-4 bg-white rounded-lg overflow-hidden'>
      <div className='-m-4 bg-white p-4'>
        <div className='flex items-center'>
          <label className='relative mr-10'>
            <div
              className={clsx(
                'flex inset-0 absolute z-10 bg-black/30 h-24 w-24 rounded-full cursor-pointer',
                typeof progress === 'number' ? 'opacity-100' : 'hover:opacity-100 opacity-0'
              )}
            >
              {typeof progress === 'number' ? (
                <span className='text-white text-xs m-auto'>{progress}%</span>
              ) : (
                <span className='text-white text-xs m-auto'>Upload</span>
              )}
            </div>
            <div className='rounded-full border-2 border-white bg-[#E1E1E2] flex h-24 w-24 overflow-hidden relative'>
              {profile?.photo_url ? (
                <Image
                  className='object-center object-cover inset-0 absolute h-full w-full'
                  fill
                  src={profile?.photo_url}
                  sizes='96px'
                  alt=''
                />
              ) : (
                <HiUser className='text-white h-16 w-16 m-auto -translate-y-1' />
              )}
            </div>
            {!profile?._is_profile_from_sso ? (
              <>
                <div className='absolute bottom-0 right-0 h-7 w-7 rounded-full bg-white border flex z-20'>
                  <HiCamera className='m-auto h-4 w-4 text-muted' />
                </div>
                {input}
              </>
            ) : null}
          </label>
          <div className='flex-1 min-w-0'>
            {startup?.id ? (
              <div className='mb-4'>
                <div className='font-bold text-xl line-clamp-3'>{startup?.id}</div>
                <div className='text-base text-muted'>
                  <span>{profile?.display_name}</span>
                </div>
              </div>
            ) : (
              <div className='mb-4'>
                <div className='font-bold text-xl'>{profile?.display_name}</div>
                <div className='text-base text-muted'>{profile?.email}</div>
              </div>
            )}
            <div
              className='-mx-5 -mt-4 translate-y-4 divide-x hidden md:block'
              /* HIDE ON MOBILE, SHOW FOOTER ACTION INSTEAD */
            >
              <TabItem id='profile'>My Profile</TabItem>
              <TabItem id='startup'>My Startup</TabItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
