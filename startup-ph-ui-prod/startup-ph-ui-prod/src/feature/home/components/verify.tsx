import React from 'react';
import { showModal } from '../../../components/modal';
import GetVerifiedForm from '@/feature/home/components/GetVerifiedForm';

export const showVerifyModal = () => {
  showModal({
    id: 'terms',
    title: "You're almost there!",
    component: VerifyModal,
    closeOutsideClick: true,
    titleClose: true,
  });
};

interface Props {
  onClose: () => void;
}

function VerifyModal({ onClose }: Props) {
  return (
    <div>
      <div className='flex flex-col justify-center space-x-2 gap-6'>
        <p className='text-gray-500 text-sm font-semibold'>
          Complete your application to get verified.
        </p>

        <GetVerifiedForm onClose={onClose} />
      </div>
    </div>
  );
}
