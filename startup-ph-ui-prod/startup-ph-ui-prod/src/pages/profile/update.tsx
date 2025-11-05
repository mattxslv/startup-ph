import ProfileForm from '@/components/auth/ProfileForm';
import Stepper from '@/components/auth/Stepper';
// import ComingSoon from '@/components/landing/ComingSoon'
import withAuth from '@/hoc/withAuth';
import AuthWrapper from '@/layout/AuthWrapper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useProfile from '@/hooks/useProfile';

type Props = {};

const WELCOME_MESSAGES = {
  startup: {
    title: 'Welcome, Startup Founder!',
    description: 'Let\'s get your startup registered and verified. You\'re one step closer to accessing government programs and opportunities.',
  },
  visitor: {
    title: 'Welcome to Startup Philippines!',
    description: 'Explore the vibrant Philippine startup ecosystem. Discover innovative startups and learn about entrepreneurship programs.',
  },
};

function UpdateProfilePage({}: Props) {
  const router = useRouter();
  const { data: profile } = useProfile();
  const userType = profile?.user_type || 'visitor';
  const welcomeMessage = WELCOME_MESSAGES[userType] || WELCOME_MESSAGES.visitor;
  
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
      <div className='text-dark text-3xl font-semibold'>{welcomeMessage.title}</div>
      <div className='text-muted mb-8'>
        {welcomeMessage.description}
      </div>
      <ProfileForm
        onSuccess={() => {
          // Redirect based on user type
          if (userType === 'startup') {
            router.replace('/profile/StartupForm');
          } else {
            router.replace('/dashboard');
          }
        }}
        note='You can always edit or add more information in your Account Details'
      />
    </AuthWrapper>
  );
}

export default withAuth(UpdateProfilePage);
