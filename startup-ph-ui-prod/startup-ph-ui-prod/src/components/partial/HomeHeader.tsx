import { Url } from 'next/dist/shared/lib/router/router';
import React, { useState } from 'react';
import HeaderUserNav from '../auth/HeaderUserNav';
import ActiveLink from '../active-link/ActiveLink';
import Image from 'next/image';
import { HiMenu } from 'react-icons/hi';
import Link from 'next/link';

type Props = {};

interface IMyLink {
  children: React.ReactNode;
  href: Url;
  activeClassName?: string;
}

const MyLink = ({ children, href, activeClassName, ...props }: IMyLink) => {
  return (
    <ActiveLink href={href} activeClassName={activeClassName} {...props}>
      {children}
    </ActiveLink>
  );
};

function HomeHeader({}: Props) {
  // const [show, setShow] = useState(false);
  return (
    <header>
      <div className='container mx-auto flex items-center md:items-end'>
        <div className='lg:mr-7 mr-2 flex-shrink-0'>
          <Link href='/'>
            <Image src='/images/logo.png' alt='StartUp Ph' height={55} width={120} priority />
          </Link>
        </div>
        <div
          // className="ml-auto md:hidden"
          className='hidden'
        >
          <button className='focus:outline-none' type='button' title='Menu'>
            <HiMenu className='w-8 h-8' />
          </button>
        </div>
        <nav className='hidden lg:flex space-x-8'>
          <MyLink href='/'>Home</MyLink>
          <MyLink href='/startups'>Startups</MyLink>
          <MyLink href='/programs'>Programs</MyLink>
          <MyLink href='/contact-us'>Contact Us</MyLink>
          <MyLink href='/news'>News</MyLink>
          <MyLink href='/resources'>Resources</MyLink>
          <MyLink href='https://www.phstartupweek.com/' activeClassName=''>
            Event
          </MyLink>
        </nav>
        <div className='inline-block ml-auto'>
          <HeaderUserNav />
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
