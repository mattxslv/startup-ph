'use client';
import { useSession } from '@/context/my-auth';
import Button from '@/ui/button/Button';
import useProfile from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import { HiMenu } from 'react-icons/hi';
import { showSideNav } from './SideNav';

type Props = {};

function HeaderUserNav({}: Props) {
  const router = useRouter();
  const session = useSession();
  const { isFetching, data: profile } = useProfile();
  if (session?.state === 'loading' || isFetching) return <div />;
  if (session?.data?.token)
    return (
      <div className='flex gap-2 translate-y-3'>
        <Button
          className='px-0'
          variant='link'
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          <div className='flex items-center'>
            <div className='mr-2'>
              <Image src='/images/ph.png' height={25} width={24} alt='' />
            </div>
            {profile?.first_name ? (
              <span className='font-normal max-w-[160px] truncate'>
                Welcome, <span className='font-semibold'>{profile?.first_name}</span>
              </span>
            ) : (
              <span className='font-normal'>
                Welcome, <span className='font-semibold'>User</span>
              </span>
            )}
          </div>
        </Button>
        <button type='button' className='md:hidden mr-2' onClick={() => showSideNav()}>
          <HiMenu className='w-8 h-8' />
        </button>
      </div>
    );
  return (
    <div className='flex gap-2 translate-y-3'>
      <Button
        className=''
        variant='link'
        onClick={() => {
          router.push('/dashboard');
        }}
      >
        Sign In
      </Button>
      <Button
        className='hidden md:inline-block'
        variant='dark'
        onClick={() => {
          router.push('/auth');
        }}
      >
        Create Account
      </Button>
      <button type='button' className='md:hidden mr-2' onClick={() => showSideNav()}>
        <HiMenu className='w-8 h-8' />
      </button>
    </div>
  );
}

export default HeaderUserNav;
