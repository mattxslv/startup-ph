import { useRouter } from 'next/router';
import Button from '@/ui/button/Button';
import Image from 'next/image';
import React from 'react';
import { useSession } from '@/context/my-auth';

type Props = {};

function Banner({}: Props) {
  const router = useRouter();
  return (
    <div className='container mx-auto px-4 py-2 md:py-3 lg:-mt-8 xl:-mt-12'>
      {/* Main Hero Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8 lg:items-start lg:pt-8'>
        {/* Content Side */}
        <div className='space-y-2 text-center lg:text-left lg:mt-0'>
          {/* Official Badge and Main Heading - Closer Together */}
          <div className='space-y-1 lg:space-y-2'>
            <div className='flex justify-center lg:justify-start lg:-mb-2'>
              <div className='inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span>Official Government Portal</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight lg:leading-tight lg:-mt-1'>
              Empowering Filipino
              <span className='text-blue-600 block'>Startups & Innovators</span>
            </h1>
          </div> {/* Close the space-y-1 container */}

          {/* Description */}
          <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0'>
            We inspire, create awareness, and promote Philippine startups to the Filipino community and to the world.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2'>
            <Button
              size='lg'
              variant='primary'
              onClick={() => router.push('/auth')}
            >
              Register Your Startup
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold'
              onClick={() => router.push('/how-it-works')}
            >
              Learn How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 text-sm text-gray-600'>
            <div className='flex items-center gap-2'>
              <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
              </svg>
              <span>Government Verified</span>
            </div>
            <div className='flex items-center gap-2'>
              <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
              </svg>
              <span>Secure Platform</span>
            </div>
            <div className='flex items-center gap-2'>
              <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
              </svg>
              <span>Free Support</span>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className='relative'>
          <div className='relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white'>
            <Image
              className='object-cover'
              fill
              src='/images/landing/banner-main.png'
              alt='Philippine Startup Ecosystem'
              sizes='(max-width: 1024px) 100vw, 50vw'
              priority
            />
            {/* Overlay Badge */}
            <div className='absolute bottom-6 left-6 right-6 bg-gradient-to-r from-blue-900/95 to-blue-700/95 text-white p-4 rounded-xl backdrop-blur-sm'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
                  <span className='text-2xl'>🚀</span>
                </div>
                <div className='font-bold text-lg'>Join the Movement</div>
              </div>
              <p className='text-sm opacity-90 leading-relaxed'>
                Part of the Philippine Innovation Act and Digital Transformation Program
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
