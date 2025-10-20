// import ComingSoon from '@/components/landing/ComingSoon';
import AuthWrapper from '@/layout/AuthWrapper';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

const RegisterForm = dynamic(() => import('@/components/auth/RegisterForm'), {
  ssr: false,
  loading: () => <div />
});

function RegisterPage({}: Props) {
  const router = useRouter()
  return (
    <AuthWrapper>
      {/* <ComingSoon
        onBack={() => {
          router.push("/");
        }}
      /> */}
      <RegisterForm
        onSuccess={() => {
          router.push("/profile/update");
        }}
        onBack={() => {
          router.push("/");
        }}
      />
    </AuthWrapper>
  )
}

export default RegisterPage;