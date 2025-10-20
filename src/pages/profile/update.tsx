import ProfileForm from '@/components/auth/ProfileForm';
import Stepper from '@/components/auth/Stepper';
// import ComingSoon from '@/components/landing/ComingSoon'
import withAuth from '@/hoc/withAuth';
import AuthWrapper from '@/layout/AuthWrapper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

function UpdateProfilePage({}: Props) {
  const router = useRouter();
  return (
    <AuthWrapper animated={false}>
      {/* <ComingSoon
        onBack={() => {
          router.push("/");
        }}
      /> */}
      <Link href='/'>
        <Image className='mb-8' src='/images/logo.png' alt='StartUp Ph' height={55} width={144} />
      </Link>
      <div className='w-56 mb-6'>
        <Stepper index={1} steps={2} />
      </div>
      <div className='text-dark text-3xl font-semibold'>Introduce yourself</div>
      <div className='text-muted mb-8'>
        Give the community a short description about who you are.
      </div>
      <ProfileForm
        onSuccess={() => {
          router.replace('/profile/StartupForm');
        }}
        note='You can always edit or add more information in your Account Details'
      />
    </AuthWrapper>
  );
}

export default withAuth(UpdateProfilePage);
