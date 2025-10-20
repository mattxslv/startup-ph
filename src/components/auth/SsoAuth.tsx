'use client';
import useAuthenticateViaSso from '@/hooks/useAuthenticateViaSso';
import React from 'react'
import Splash from '../partial/Splash';

type Props = {
  query: any,
}

function SsoAuth({ query }: Props) {
  const { isLoading, error } = useAuthenticateViaSso(query);
  if (isLoading) return (
    <Splash />
  )
  if (error?.message) return (
    <div className="text-center">
      {error?.message}
    </div>
  )
  return (
    <Splash />
  )
}

export default SsoAuth