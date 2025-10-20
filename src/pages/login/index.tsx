import withPublicOnly from '@/hoc/withPublicOnly';
import AuthWrapper from '@/layout/AuthWrapper';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react'

const LoginForm = dynamic(() => import('@/components/auth/LoginForm'), {
  ssr: false,
  loading: () => <div />
});

type Props = {}

function LoginPage({}: Props) {
  const router = useRouter()
  return (
    <AuthWrapper>
      <LoginForm
        onBack={() => {
          router.push("/");
        }}
      />
    </AuthWrapper>
  )
}

export default withPublicOnly(LoginPage)