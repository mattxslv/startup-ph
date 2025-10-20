'use client';
import { signOut, useSession } from '@/context/my-auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

type Props = {};

function LogoutPage({}: Props) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.state === 'loading') return;
    if (session?.data?.token) {
      signOut();
    }
    router.replace('/');
    // eslint-disable-next-line
  }, [session]);
  return <div>Session expired...Please wait</div>;
}

export default LogoutPage;
