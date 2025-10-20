import AuthForm from '@/components/auth/AuthForm';
import AuthWrapper from '@/layout/AuthWrapper';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

function AuthPage({}: Props) {
  const router = useRouter();
  return (
    <AuthWrapper>
      <AuthForm />
    </AuthWrapper>
  );
}

export default AuthPage;
