/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className='bg-[#1B1B1B]'>
      <div className='container mx-auto px-8 py-10 md:py-16 pb-24 md:pb-20 text-white text-sm relative'>
        <div className='flex flex-col md:flex-row flex-wrap space-y-6 md:space-y-0'>
          <div className='mr-8 md:mr-20 absolute md:relative right-0'>
            <img className='w-40' src='/images/coat-of-arms.png' alt='Coat of Arms' />
          </div>
          <div className='mr-auto'>
            <img className='h-10 mb-2 md:mb-6' src='/images/logo-white.png' alt='Logo' />
            <div>Copyright © 2023 Startup PH</div>
            <div>All Rights Reserved</div>
          </div>
          <div className='flex flex-col space-y-4 mr-auto'>
            <div className='uppercase font-bold'>About Us</div>
            <Link
              className='text-white/75 hover:text-white transition'
              href='/terms-and-conditions'
            >
              Terms &amp; Conditions
            </Link>
            <Link className='text-white/75 hover:text-white transition' href='/privacy-policy'>
              Privacy Policy
            </Link>
          </div>
          <div className='mr-auto'>
            <div className='text-sm font-semibold mb-2'>DEVELOPED BY</div>
            <div className='flex space-x-4'>
              {/* <img className="h-16" src="images/misc/dost.png" alt="" /> */}
              <img className='h-14' src='images/make.png' alt='' />
              {/* <img className="h-16" src="images/misc/dti-white.png" alt="" /> */}
            </div>
          </div>
          <div className='mr-auto'>
            <div className='text-sm font-semibold mb-2'>IN PARTNERSHIP WITH</div>
            <div className='flex items-center space-x-4'>
              <img className='h-14' src='/images/misc/dost-white.png' alt='DOST Logo' />
              <img className='h-14' src='/images/misc/dti-white.png' alt='DTI Logo' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
