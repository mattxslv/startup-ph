import ContactUsForm from '@/components/contact-us/ContactUsForm';
import HomeLayout from '@/layout/HomeLayout';
import Image from 'next/image';
import React from 'react';

type Props = {};

function ContactUsPage({}: Props) {
  return (
    <HomeLayout>
      <div className='container flex-grow mx-auto flex'>
        <div className='w-full max-w-xl p-5 md:p-11 flex relative z-20'>
          <div className='bg-white rounded-2xl flex-grow w-full p-6 md:p-12 flex flex-col'>
            <div className='text-dark text-3xl font-semibold mb-4'>Let&apos;s talk business!</div>
            <div className='text-muted mb-8'>
              Get in touch with us for expert guidance on your startup journey.
            </div>
            <ContactUsForm />
          </div>
          <div className='absolute bottom-[25%] left-0 h-48 w-48 -z-10'>
            <Image
              className='object-center object-contain z-10 translate-x-[-100%] translate-y-[-10%]'
              fill
              src='/images/how-it-works/dots.png'
              sizes='280px'
              alt=''
            />
          </div>
        </div>
        <div className='flex-1 lg:flex flex-col justify-end items-end hidden relative max-w-5xl -ml-11 pl-11'>
          <div className='relative pt-[100%] w-full origin-bottom-right scale-125 2xl:scale-90'>
            <Image
              className='absolute bottom-[25%] left-[20%] scale-50 xl:scale-100 z-10'
              src='/images/contact-us/mail.png'
              height={128}
              width={128}
              alt=''
            />
            <Image
              className='absolute bottom-[40%] right-[0%] rotate-[40deg] scale-50 xl:scale-90 z-10'
              src='/images/contact-us/mail.png'
              height={128}
              width={128}
              alt=''
            />
            <Image
              className='absolute top-[10%] right-[8%] rotate-[20deg] scale-50 xl:scale-90 z-10'
              src='/images/contact-us/mail.png'
              height={128}
              width={128}
              alt=''
            />
            <Image
              className='absolute top-[5%] left-[20%] scale-50 xl:scale-90 z-10'
              src='/images/contact-us/mail.png'
              height={128}
              width={128}
              alt=''
            />
            <Image
              className='absolute inset-0 h-full w-full z-20'
              fill
              src='/images/contact-us/rocket.png'
              sizes='919px'
              alt=''
            />

            <div className='absolute top-0 right-0 h-48 w-48 -z-0'>
              <Image
                className='object-center object-contain z-10 translate-x-[50%] translate-y-[-10%]'
                fill
                src='/images/how-it-works/dots.png'
                sizes='280px'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 right-0 translate-x-[25%] z-[-1] h-[400px] w-[400px] rounded-full bg-[#FFDCD1] blur-[190px]' />
      <div className='fixed top-0 left-[50%] translate-y-[50%] translate-x-[-50%] z-[-1] h-[400px] w-[400px] rounded-full bg-[#BBE7FF] blur-[150px] opacity-40' />
      <div className='fixed bottom-0 left-0 translate-x-0 z-[-1] h-[400px] w-[400px] rounded-full bg-[#FEE1FF] blur-[190px]' />
    </HomeLayout>
  );
}

export default ContactUsPage;
