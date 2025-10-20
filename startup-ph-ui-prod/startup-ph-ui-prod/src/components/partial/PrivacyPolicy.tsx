import React from 'react';
import { showModal } from '../modal';
import Button from '@/ui/button/Button';
import Privacy from './Privacy';

export const showPrivacyModal = () => {
  showModal({
    id: 'privacy',
    title: 'START-UP PRIVACY NOTICE',
    component: PrivacyModal,
    closeOutsideClick: true,
    titleClose: true,
  });
};

interface Props {
  onClose: () => void;
}

function PrivacyModal({ onClose }: Props) {
  return (
    <div>
      <Privacy />
      <div className='flex justify-center space-x-2 mt-4'>
        <Button size='sm' onClick={onClose}>
          I Agree
        </Button>
      </div>
    </div>
  );
}
