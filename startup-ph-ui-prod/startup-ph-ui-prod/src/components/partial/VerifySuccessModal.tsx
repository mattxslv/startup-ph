import React from 'react';
import { showModal } from '../modal';
import Button from '@/ui/button/Button';

export const showVerifySuccessModal = () => {
  showModal({
    id: '',
    title: '',
    component: VerifySuccessModal,
    closeOutsideClick: true,
    // titleClose: true,
    size: 'base',
  });
};

interface Props {
  onClose: () => void;
}

function VerifySuccessModal({ onClose }: Props) {
  return (
    <div className='flex flex-col items-center'>
      <img src='/images/animated/success.gif' alt='Success Icon' className='w-32' />
      <h1 className='text-xl text-green-600 font-semibold mb-5'>Congratulations!</h1>
      <p className='mb-10 text-sm'>
        Your application will be assessed for verification. Please check your email for the status
        of your assessment.
      </p>
      <Button onClick={onClose} size='sm' variant='link'>
        Close
      </Button>
    </div>
  );
}
