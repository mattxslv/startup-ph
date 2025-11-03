import { useSession } from '@/context/my-auth';
import { IRegisterForm, useRegister } from '@/hooks/useRegister';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import FormTurnstile from '@/ui/form/FormTurnstile';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Stepper from './Stepper';
import { FormikHelpers } from 'formik';
import Link from 'next/link';
import clsx from 'clsx';
import useAuthenticateViaEmail from '@/hooks/useAuthenticateViaEmail';
import InputOTP from '@/ui/form/InputOTP';

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const getInitForm = (): IRegisterForm => ({
  email: sessionStorage.getItem('auth_email') || '',
  password: sessionStorage.getItem('password') || '',
  password_confirmation: sessionStorage.getItem('passConfirmation') || '',
  user_type: (sessionStorage.getItem('user_type') as 'visitor' | 'startup' | 'enabler') || 'startup',
  pin: '',
  captcha: null,
});

const TIMEOUT = 30;

const clamp = (x: number) => (x > 0 ? x : 0);

function Resend({ onResend }: { onResend: (cb: () => void) => void }) {
  const TIMEOUT = 55;

  const [timer, setTimer] = useState(TIMEOUT);
  const tmr = clamp(timer);

  useEffect(() => {
    if (tmr < 1) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tmr]);

  const canResend = timer < 1;
  return (
    <button
      className={clsx(
        'text-right font-semibold text-sm disabled:cursor-not-allowed',
        canResend ? 'text-primary' : 'text-disabled'
      )}
      disabled={!canResend}
      type='button'
      onClick={() =>
        onResend(() => {
          setTimer(TIMEOUT);
        })
      }
    >
      {canResend ? <span>Resend</span> : <span>Resend email code in {tmr} seconds...</span>}
    </button>
  );
}

export function PasswordGuide({ value }: { value: { password: string } }) {
  const isLengthOk = value.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(value.password);
  const hasLowercase = /[a-z]/.test(value.password);
  const hasSymbol = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value.password);
  const hasNumber = /[0-9]/.test(value.password);
  return (
    <div className='text-xs text-description leading-4 mt-2'>
      Minimum of{' '}
      <span className={clsx(isLengthOk ? 'text-success' : 'text-danger')}>8 characters</span>,
      contains both{' '}
      <span className={clsx(hasUppercase ? 'text-success' : 'text-danger')}>uppercase</span> and{' '}
      <span className={clsx(hasLowercase ? 'text-success' : 'text-danger')}>lowercase</span>{' '}
      letters,{' '}
      <span className={clsx(hasSymbol ? 'text-success' : 'text-danger')}>atleast one symbol</span>{' '}
      and{' '}
      <span className={clsx(hasNumber ? 'text-success' : 'text-danger')}>atleast one number</span>
    </div>
  );
}

export function PasswordMatch({
  value,
}: {
  value: { password: string; password_confirmation: string };
}) {
  if (value.password === value.password_confirmation)
    return <div className='text-xs text-success leading-4 mt-2'>Matched</div>;
  return <div className='text-xs text-danger leading-4 mt-2'>Does not match</div>;
}

function RegisterForm({ onSuccess, onBack }: Props) {
  const mutator = useRegister();
  const { setData } = useSession();
  const resender = useAuthenticateViaEmail();
  const handleSubmit = (payload: IRegisterForm, { setErrors }: FormikHelpers<IRegisterForm>) => {
    mutator.mutate(
      { payload },
      {
        onSuccess: (res) => {
          onSuccess();
          setData({ token: res.token });
        },
        onError: (err: any) => {
          if (err?.status === 422) setErrors(err?.errors);
        },
      }
    );
  };
  return (
    <>
      <Link href='/'>
        <Image className='mb-8' src='/images/logo.png' alt='StartUp Ph' height={55} width={144} />
      </Link>
      <div className='w-56 mb-6'>
        <Stepper index={2} steps={2} />
      </div>
      <div className='text-dark text-3xl font-semibold'>One-time Password </div>
      <div className='text-muted mb-8'>
        We’ve sent an email to {sessionStorage.getItem('auth_email')} containing a 6-digit code
      </div>
      <Form className='flex-1 flex flex-col' initialValues={getInitForm()} onSubmit={handleSubmit}>
        {({ values }) => (
          <>
            <div className='space-y-3 mb-6'>
              <div className='relative'>
                <InputOTP name='pin' label='6-Digit-PIN' required reset={true} numInputs={6} />
              </div>

              <FormTurnstile name='captcha' required />

              <Resend
                onResend={(cb) => {
                  resender.mutate(
                    {
                      email: getInitForm().email,
                    },
                    {
                      onSuccess: () => {
                        cb();
                      },
                    }
                  );
                }}
              />
              <p className='text-sm text-muted'>
                Didn’t receive the email? Try checking your junk or spam folders.
              </p>
              <div className='space-y-4'>
                <Button
                  className='w-full'
                  variant='primary'
                  trailing={<HiArrowRight />}
                  type='submit'
                  disabled={mutator.isLoading || !values?.captcha}
                >
                  Confirm
                </Button>
                <Button
                  className='w-full'
                  variant='link'
                  onClick={() => {
                    onBack();
                  }}
                >
                  Back
                </Button>
              </div>

              {/* <div className="flex justify-center space-x-2 items-center">
                <div className="w-12 border-b" />
                <div>OR</div>
                <div className="w-12 border-b" />
              </div> */}
            </div>
          </>
        )}
      </Form>
    </>
  );
}

export default RegisterForm;
