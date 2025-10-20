import Image from 'next/image';
import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';

type Props = {};

function SectionStartup({}: Props) {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16'>
        <div
          className='relative pt-[67%] md:pt-0'
          aos-offset='0'
          data-aos-delay='0'
          disable-data-aos='zoom-in'
        >
          <Image
            className='object-contain object-center'
            src='/images/landing/banner-startup.png'
            fill
            sizes='540px'
            alt='Startup'
          />
        </div>
        <div className='space-y-6 text-center md:text-left'>
          <h2
            className='text-2xl md:text-5xl font-bold text-dark'
            aos-offset='0'
            data-aos-delay='0'
            disable-data-aos='fade-right'
          >
            Kickstart your startup
          </h2>
          <p
            className='text-muted font-medium leading-7'
            aos-offset='0'
            data-aos-delay='100'
            disable-data-aos='fade-right'
          >
            We provide startups with resources, information, and expertise while developing the
            entrepreneurial talent pool, and build successful startups through programs that
            accelerate growth.
          </p>
          {/* <h2
            className='text-2xl md:text-5xl font-bold text-dark'
            aos-offset='0'
            data-aos-delay='0'
            disable-data-aos='fade-right'
          >
            Why choose us?
          </h2> */}
          <div className='text-left'>
            <ul className='font-bold text-muted space-y-4'>
              <li
                className='flex space-x-1.5'
                aos-offset='0'
                data-aos-delay='0'
                disable-data-aos='fade-up'
              >
                <span className='flex-shrink-0 p-1'>
                  <HiCheckCircle className='text-success h-3.5 w-3.5' />
                </span>
                <span className='leading-7'>
                  Gives makers access to a huge, global community of tech people and early adopters
                </span>
              </li>
              <li
                className='flex space-x-1.5'
                aos-offset='0'
                data-aos-delay='25'
                disable-data-aos='fade-up'
              >
                <span className='flex-shrink-0 p-1'>
                  <HiCheckCircle className='text-success h-3.5 w-3.5' />
                </span>
                <span className='leading-7'>
                  Reach an audience of highly-engaged product lovers
                </span>
              </li>
              <li
                className='flex space-x-1.5'
                aos-offset='0'
                data-aos-delay='50'
                disable-data-aos='fade-up'
              >
                <span className='flex-shrink-0 p-1'>
                  <HiCheckCircle className='text-success h-3.5 w-3.5' />
                </span>
                <span className='leading-7'>
                  Validate that the idea for a product is a good one/find product-market fit.
                </span>
              </li>
            </ul>
          </div>
          {/* <p
            className='text-muted font-medium leading-7'
            aos-offset='0'
            data-aos-delay='100'
            disable-data-aos='fade-right'
          >
            Prepare for liftoff and embark on your entrepreneurial journey with us!
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default SectionStartup;
