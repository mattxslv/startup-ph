import ActiveLink from '@/components/active-link/ActiveLink';
import { showSideNav } from '@/components/auth/SideNav';
import CommonHead from '@/components/partial/CommonHead';
import FooterNav from '@/components/partial/FooterNav';
import { TabProvider } from '@/components/tab';
import { signOut } from '@/context/my-auth';
import useProfile from '@/hooks/useProfile';
import Button from '@/ui/button/Button';
import Dropdown, { DropdownItem } from '@/ui/dropdown/Dropdown';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { HiChevronDown, HiMenu, HiUser } from 'react-icons/hi';

function NavUser() {
  const { data: profile } = useProfile();
  const myDropdown = useRef<any>(null);
  const router = useRouter();
  if (!profile) {
    return (
      <div className='flex gap-2 mt-3'>
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
  return (
    <div className='flex items-center'>
      <div className='relative mt-3'>
        <button
          type='button'
          onClick={() => {
            // if (profile?._is_profile_from_sso) return;
            myDropdown.current.setShow((v: boolean) => !v);
          }}
        >
          <div className='flex items-center'>
            {profile?.photo_url ? (
              <span className='h-6 w-6 rounded-full relative overflow-hidden mr-2'>
                <Image
                  className='object-cover object-center'
                  fill
                  src={profile?.photo_url}
                  sizes='24px'
                  alt=''
                />
              </span>
            ) : (
              <span className='rounded-full bg-[#999999] h-6 w-6 inline-flex items-center justify-center mr-2'>
                <HiUser className='h-5 w-5 text-white' />
              </span>
            )}
            <p className='max-w-[110px] truncate'>{profile?.display_name ?? '-'}</p>
            {/* {!profile?._is_profile_from_sso ? <HiChevronDown className='ml-2' /> : null} */}
            <HiChevronDown className='ml-2' />
          </div>
        </button>
        <Dropdown ref={myDropdown}>
          <DropdownItem onClick={() => router.push('/dashboard')}>My Dashboard</DropdownItem>
          <DropdownItem onClick={() => router.push('/profile')}>Profile</DropdownItem>
          <DropdownItem
            onClick={() => {
              router.replace('/');
              setTimeout(() => {
                signOut();
              }, 100);
            }}
          >
            Logout
          </DropdownItem>
        </Dropdown>
      </div>

      <button type='button' className='md:hidden mr-2 mt-1' onClick={() => showSideNav()}>
        <HiMenu className='w-8 h-8' />
      </button>
    </div>
  );
}

function HomeLayout({
  children,
  noHeader = false,
  noFooter = false,
}: {
  children: any;
  noHeader?: boolean;
  noFooter?: boolean;
}) {
  const { data: profile } = useProfile();
  return (
    <TabProvider id='home-tabs' defaultTab='profile'>
      {!noHeader ? <CommonHead /> : null}
      <div
        className={clsx(
          'bg-gradient-to-r flex-1 min-h-full from-[#FAFDFF] to-[#EFEDFF] flex flex-col',
          !noFooter ? 'pb-20' : ''
        )}
      >
        <div className='relative z-20 py-[1.5rem] px-[1rem] md:py-[2rem] md:px-[4rem]'>
          <div className='flex items-center justify-between gap-5'>
            <Link href='/'>
              <Image src='/images/logo.png' alt='StartUp Ph' height={55} width={120} />
            </Link>
            <div className='hidden lg:flex space-x-11 mt-2'>
              <ActiveLink href='/'>Home</ActiveLink>
              <ActiveLink href='/startups'>Startups</ActiveLink>
              <ActiveLink href='/programs'>Programs</ActiveLink>
              <ActiveLink href='/contact-us'>Contact Us</ActiveLink>
              <ActiveLink href='/news'>News</ActiveLink>
              <ActiveLink href='/resources'>Resources</ActiveLink>
              <ActiveLink href='https://www.phstartupweek.com/' activeClassName=''>
                Event
              </ActiveLink>
            </div>
            <NavUser />
          </div>
        </div>
        <div className='w-full mx-auto flex flex-col flex-1'>{children}</div>
      </div>
      {!noFooter && profile ? <FooterNav /> : null}
    </TabProvider>
  );
}

export default HomeLayout;
