import SsoAuth from '@/components/auth/SsoAuth';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

function SsoPage({}: Props) {
  const router = useRouter();
  if (!router?.isReady) return <div />

  return (
    <SsoAuth query={router?.query} />
  )
}

export default SsoPage