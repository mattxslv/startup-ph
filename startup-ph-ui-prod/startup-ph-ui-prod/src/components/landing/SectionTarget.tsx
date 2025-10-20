import Button from '@/ui/button/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

function SectionTarget({}: Props) {
  const router = useRouter();
  return (
    <div className='container mx-auto pb-1'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16'>
        <div
          className='relative pt-[67%] md:pt-0 order-first md:order-last'
          aos-offset='0'
          data-aos-delay='0'
          disable-data-aos='zoom-in'
        >
          <Image
            className='object-contain object-center scale-110 md:scale-125'
            src='/images/landing/banner-target.png'
            fill
            sizes='530px'
            alt='Startup'
          />
        </div>
        <div className='space-y-6 text-center md:text-left'>
          <h1
            className='text-2xl md:text-5xl font-bold text-dark'
            aos-offset='0'
            data-aos-delay='0'
            disable-data-aos='fade-left'
          >
            We are the #1 Source of Startup News and Updates!
          </h1>
          <p
            className='text-muted font-medium leading-7'
            aos-offset='0'
            data-aos-delay='100'
            disable-data-aos='fade-left'
          >
            We provide the latest news, statistics, events, programs and benefits for PH Startup
            Ecosystem.
          </p>
          <div aos-offset='0' data-aos-delay='0' disable-data-aos='fade'>
            <Button
              className='px-10'
              variant='outline'
              onClick={() => {
                router.push('/how-it-works');
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionTarget;
