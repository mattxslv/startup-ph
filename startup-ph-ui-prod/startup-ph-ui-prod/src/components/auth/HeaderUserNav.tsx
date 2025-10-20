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
      <div className='flex items-center gap-2'>
        <Button
          className='px-0 text-sm font-medium hover:bg-primary/10 rounded-full px-3 py-2 transition-colors'
          variant='link'
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          <div className='flex items-center'>
            <div className='mr-2'>
              <Image src='/images/ph.png' height={20} width={20} alt='' className='rounded-full' />
            </div>
            {profile?.first_name ? (
              <span className='font-normal max-w-[120px] truncate'>
                Welcome, <span className='font-semibold'>{profile?.first_name}</span>
              </span>
            ) : (
              <span className='font-normal'>
                Welcome, <span className='font-semibold'>User</span>
              </span>
            )}
          </div>
        </Button>

      </div>
    );
  return (
    <div className='flex items-center gap-2'>
      <button
        className='relative rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer group
                   inline-flex items-center justify-center gap-2 shrink-0 outline-none focus-visible:ring-[3px]
                   border-0 bg-black text-white
                   hover:bg-gray-800 hover:shadow-lg transform hover:scale-105 transition-all duration-200
                   shadow-md before:absolute before:bottom-[-2px] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5
                   before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]
                   before:[filter:blur(0.75rem)]'
        style={{
          '--color-1': '#ff0000',
          '--color-2': '#ffff00',
          '--color-3': '#0000ff',
          '--color-4': '#ff0000',
          '--color-5': '#ffff00'
        } as React.CSSProperties}
        onClick={() => {
          router.push('/login');
        }}
      >
        Login/Sign up
      </button>
      <button type='button' className='md:hidden p-2' onClick={() => showSideNav()}>
        <HiMenu className='w-6 h-6' />
      </button>
    </div>
  );
}

export default HeaderUserNav;
