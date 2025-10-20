import { useRouter } from 'next/router';
import Button from '@/ui/button/Button';
import Image from 'next/image';
import React from 'react';
import { useSession } from '@/context/my-auth';

type Props = {};

function CountLabel({ label, value }: { label: string; value: string }) {
  return (
    <div
      className='text-center md:text-left'
      aos-offset='0'
      data-aos-delay='300'
      data-aos='zoom-in'
    >
      <div className='text-3xl md:text-5xl text-dark font-bold'>{value}</div>
      <div className='text-muted'>{label}</div>
    </div>
  );
}

const BannerAction = () => {
  const router = useRouter();
  const session = useSession();
  if (session.state === 'loading')
    return (
      <Button
        size='lg'
        variant='primary'
        onClick={() => {
          router.push('/auth');
        }}
      >
        Register your startup now!
      </Button>
    );
  return (
    <>
      {Boolean(session?.data?.token) ? (
        <Button
          size='lg'
          variant='primary'
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          Go to My Dashboard
        </Button>
      ) : (
        <Button
          size='lg'
          variant='primary'
          onClick={() => {
            router.push('/auth');
          }}
        >
          Register your startup now!
        </Button>
      )}
    </>
  );
};

function Banner({}: Props) {
  const router = useRouter();
  return (
    <div className='container mx-auto relative'>
      <div className='w-full md:w-1/2 text-center md:text-left'>
        {/* <div className="mb-8 flex justify-center md:justify-start" aos-offset="0" data-aos-delay="100" data-aos="fade">
          <Button
            size="sm"
            trailing={<span className="flex-shrink-0"><Image height={27} width={27} src="/images/landing/megaphone.png" alt="megaphone" /></span>}
          >
            Next generation product startup
          </Button>
        </div> */}
        <h1
          className='text-3xl md:text-6xl font-bold text-dark mb-3 md:mb-10'
          data-aos-offset='0'
          data-aos='fade-up'
        >
          Introduce your startup
        </h1>
        <p
          className='text-muted text-lg mb-10'
          data-aos-offset='0'
          data-aos-delay='100'
          data-aos='fade-up'
        >
          We inspire, create awareness, and promote Philippine startups to the Filipino community
          and to the world.
        </p>
        <div className='mb-10 flex flex-col items-center md:flex-row'>
          <div aos-offset='0' data-aos-delay='200' data-aos='fade'>
            <BannerAction />
          </div>
          <div aos-offset='0' data-aos-delay='250' data-aos='fade'>
            <Button
              size='lg'
              variant='link'
              onClick={() => {
                router.push('/how-it-works');
              }}
            >
              How it Works?
            </Button>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 md:flex md:space-x-16">
          <CountLabel label="Registered startups" value="469" />
          <CountLabel label="Successful projects" value="83%" />
        </div> */}
      </div>
      <div
        className='relative md:absolute w-full md:w-1/2 pt-[100%] md:pt-0 md:h-full top-0 right-0 md:scale-125'
        data-aos-offset='0'
        data-aos='zoom-in'
      >
        <Image
          className='object-contain'
          fill
          src='/images/landing/banner-main.png'
          alt='Main Banner'
          sizes='788px'
          priority
        />
      </div>
    </div>
  );
}

export default Banner;
