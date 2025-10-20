import React from 'react';
import { showModal } from '../modal';
import Button from '@/ui/button/Button';
import Terms from './Terms';

export const showTermsModal = () => {
  showModal({
    id: 'terms',
    title: 'TERMS AND CONDITIONS',
    component: TermsModal,
    closeOutsideClick: true,
    titleClose: true,
  });
};

interface Props {
  onClose: () => void;
}

function TermsModal({ onClose }: Props) {
  return (
    <div>
      <Terms />
      <div className='flex justify-end space-x-2 mt-4'>
        <Button size='sm' onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
