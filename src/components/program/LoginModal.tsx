import React from 'react';
import { showModal } from '../modal';
import LoginForm from '../auth/LoginForm';

export const showLoginModal = () => {
  showModal({
    id: 'login-modal',
    title: '',
    component: LoginModal,
    closeOutsideClick: true,
    titleClose: true,
    // size: 'sm',
  });
};

interface Props {
  onClose: () => void;
}

function LoginModal({ onClose }: Props) {
  return <LoginForm onBack={onClose} onSuccess={onClose} onLinkClick={onClose} />;
}
