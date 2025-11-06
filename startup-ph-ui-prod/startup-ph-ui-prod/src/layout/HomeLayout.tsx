import { showSideNav } from '@/components/auth/SideNav';
import CommonHead from '@/components/partial/CommonHead';
import FooterNav from '@/components/partial/FooterNav';
import Footer from '@/components/partial/Footer';
import { TabProvider } from '@/components/tab';
import { signOut } from '@/context/my-auth';
import useProfile from '@/hooks/useProfile';
import Button from '@/ui/button/Button';
import Dropdown, { DropdownItem } from '@/ui/dropdown/Dropdown';
import SimpleChatbot from '@/components/simple-chatbot/SimpleChatbot';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect } from 'react';
import { HiChevronDown, HiMenu, HiUser } from 'react-icons/hi';

function NavUser() {
  const { data: profile } = useProfile();
  const myDropdown = useRef<any>(null);
  const router = useRouter();
  if (!profile) {
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

function NavLink({ href, children, currentPath }: { href: string; children: React.ReactNode; currentPath: string }) {
  const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <a
      className={`relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer ${
        isActive ? 'text-blue-600' : ''
      }`}
      href={href}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${
        isActive ? 'w-full' : 'w-0'
      }`}></span>
    </a>
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
  const { asPath } = useRouter();
  return (
    <TabProvider id='home-tabs' defaultTab='profile'>
      {!noHeader ? <CommonHead /> : null}
      <div
        className={clsx(
          'bg-gradient-to-r flex-1 min-h-full from-[#FAFDFF] to-[#EFEDFF] flex flex-col',
          !noFooter ? 'pb-20' : ''
        )}
      >
        <header className="fixed top-0 z-50 w-full border-b-2 border-black/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="Startup home">
              <Image
                src="/images/logo.png"
                alt="StartUp Ph logo"
                width={180}
                height={85}
                className="h-10 w-auto"
                priority
              />
            </Link>

            <div className="flex items-center gap-3 flex-1">
              <div className="ml-auto">
                <ul className="hidden md:flex items-center gap-8 text-base font-bold">
                  <li>
                    <NavLink href="/" currentPath={asPath}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink href="/startups" currentPath={asPath}>Startups</NavLink>
                  </li>
                  <li>
                    <NavLink href="/programs" currentPath={asPath}>Programs</NavLink>
                  </li>
                  <li>
                    <NavLink href="/contact-us" currentPath={asPath}>Contact Us</NavLink>
                  </li>
                  <li>
                    <NavLink href="/news" currentPath={asPath}>News</NavLink>
                  </li>
                  <li>
                    <NavLink href="/resources" currentPath={asPath}>Resources</NavLink>
                  </li>
                  <li>
                    <a className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer" href="https://www.phstartupweek.com/">
                      Event
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="ml-auto">
                <NavUser />
              </div>
            </div>
          </nav>
        </header>
        <div className='w-full mx-auto flex flex-col flex-1 pt-20'>{children}</div>
      </div>
      {!noFooter && profile ? <FooterNav /> : null}
      <Footer />
      {profile && <SimpleChatbot />}
    </TabProvider>
  );
}

export default HomeLayout;
