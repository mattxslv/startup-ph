/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

function SuccessPage({}: Props) {
  const router = useRouter();
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer === 0) {
      router.replace('/dashboard');
    }
  }, [timer]);
  return (
    <div className="py-16">
      <div className="flex flex-col items-center text-center">
        <img className="h-32 w-32" src="/images/auth/check-circle.png" alt="Check" />
        <div className="text-emerald-700 text-4xl font-semibold mb-8">Congratulations!</div>
        <div>
          <div className="text-dark font-semibold">Your application will be assessed for verification.</div>
          <div className="text-dark">You will be redireted to your account profile shortly. ({timer}s)</div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage