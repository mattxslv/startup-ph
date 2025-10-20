import Button from '@/ui/button/Button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  onBack: () => void;
};

function ComingSoon({ onBack }: Props) {
  return (
    <>
      <Link href='/'>
        <Image className='mb-8' src='/images/logo.png' alt='StartUp Ph' height={55} width={144} />
      </Link>
      <div className='flex flex-col justify-center items-center p-6'>
        <Image height={160} width={160} className='mb-4' src='/images/misc/wip.png' alt='wip' />
        <div className='text-base font-semibold mb-4'>Feature Coming Soon</div>
        <div className='mb-4 w-16 border-b' />
        <div className='text-[#475569] text-sm space-y-4 mb-4 text-center'>
          <p>
            We are currently updating this feature to serve you better.
            <br />
            <br />
            Thank you for your patience and support.
          </p>
          {/* {!profile ? <p>Dear User,</p> : <p>Dear {profile.first_name},</p>}
          <p>We wanted to give you a heads up about an exciting new feature we're currently working on! Our team is putting in dedicated effort to ensure a seamless and efficient implementation. Rest assured, we are committed to delivering a top-notch experience for our users.</p>
          <p>Thank you for your patience and continued support as we strive to enhance your experience with our services.</p>
          <p>Best regards,<br /><span className="font-semibold">eGovPH Team</span></p> */}
        </div>
        <div className='flex justify-center w-full'>
          <Button
            onClick={() => {
              onBack();
            }}
          >
            Go Back to Homepage
          </Button>
        </div>
      </div>
    </>
  );
}

export default ComingSoon;
