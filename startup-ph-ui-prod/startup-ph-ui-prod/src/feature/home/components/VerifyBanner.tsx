import Button from '@/ui/button/Button';
import clsx from 'clsx';
import React from 'react';
import { HiChevronRight, HiX } from 'react-icons/hi';
import { showVerifyModal } from './verify';

interface Props {
  showGetVerified: boolean;
  toggleGetVerified: (show: boolean) => void;
  isVerifiable: string | boolean | undefined;
}

const VerifyBanner = ({ showGetVerified, isVerifiable, toggleGetVerified }: Props) => {
  return (
    <div
      className={clsx(
        'fixed left-0 bottom-0 w-full z-40 pb-20 lg:pb-10 px-3 transition-all ease-in-out delay-500 duration-500',
        showGetVerified && isVerifiable
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      )}
    >
      <div className='bg-black text-white py-4 px-6 rounded-lg text-sm w-full max-w-lg sm:max-w-5xl mx-auto'>
        <div className='float-right'>
          <button
            className='focus:outline-none hover:bg-gray-800 rounded-full p-1 transition-colors'
            onClick={() => toggleGetVerified(false)}
            type='button'
            aria-label='Close'
          >
            <HiX className='w-5 h-5' />
          </button>
        </div>
        <div className='text-lg font-semibold'>Get Verified</div>
        <div className='flex justify-between'>
          <div className='mr-4 mt-2'>
            Verify your account to gain access to a multitude of programs!
          </div>
          <Button
            className='flex-shrink-0 mt-auto rounded-full px-4'
            variant='primary'
            size='xs'
            onClick={() => showVerifyModal()}
          >
            {/*  router.push("/get-verified");  */}
            <div className='flex items-center space-x-2'>
              <span>Verify Now</span>
              <HiChevronRight className='w-4 h-4 flex-shrink-0' />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyBanner;
