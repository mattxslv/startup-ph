import { useSession } from '@/context/my-auth';
import { IRegisterForm, useRegister } from '@/hooks/useRegister';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputPassword from '@/ui/form/InputPassword';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Stepper from './Stepper';
import { showTermsModal } from '../partial/TermsAndConditions';
import { showPrivacyModal } from '../partial/PrivacyPolicy';
import { FormikHelpers } from 'formik';
import Link from 'next/link';
import InputMask from '@/ui/form/InputMask';
import clsx from 'clsx';
import useAuthenticateViaEmail from '@/hooks/useAuthenticateViaEmail';

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const getInitForm = (): IRegisterForm => ({
  email: sessionStorage.getItem('auth_email') || '',
  password: '',
  password_confirmation: '',
  pin: '',
});

const TIMEOUT = 30;

const clamp = (x: number) => (x > 0 ? x : 0);

function Resend({ onResend }: { onResend: (cb: () => void) => void }) {
  const [timer, setTimer] = useState(TIMEOUT);
  const tmr = clamp(timer);
  useEffect(() => {
    if (tmr < 1) {
      return;
    }
    const x = setTimeout(() => {
      setTimer((x) => x - 1);
    }, 1000);
    return () => {
      clearTimeout(x);
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
      {canResend ? <span>Resend</span> : <span>Resend ({tmr}s)</span>}
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
      {
        payload,
      },
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
  const handleViewTerms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showTermsModal();
  };
  const handleViewPivacy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showPrivacyModal();
  };
  return (
    <>
      <Link href='/'>
        <Image className='mb-8' src='/images/logo.png' alt='StartUp Ph' height={55} width={144} />
      </Link>
      <div className='w-56 mb-6'>
        <Stepper index={1} steps={3} />
      </div>
      <div className='text-dark text-3xl font-semibold'>Create your account</div>
      <div className='text-muted mb-8'>An 6-Digit PIN has been sent to your email address.</div>
      <Form className='flex-1 flex flex-col' initialValues={getInitForm()} onSubmit={handleSubmit}>
        {({ values }) => (
          <>
            <div className='space-y-3 mb-6'>
              <div>
                <Input name='email' label='Email Address' required disabled />
              </div>
              <div>
                <InputPassword autoFocus name='password' label='Set your password' required />
                {values ? <PasswordGuide value={values} /> : null}
              </div>
              <div>
                <InputPassword
                  name='password_confirmation'
                  label='Re-Type your password'
                  required
                />
                {values ? <PasswordMatch value={values} /> : null}
              </div>
              <div className='relative'>
                <div className='absolute bottom-0 right-0 z-10 py-2 px-3'>
                  <Resend
                    onResend={(cb) => {
                      resender.mutate(
                        { email: getInitForm().email },
                        {
                          onSuccess: () => {
                            cb();
                          },
                        }
                      );
                    }}
                  />
                </div>
                <InputMask name='pin' label='6-Digit-PIN' mask='999999' required type='tel' />
              </div>
              <div>
                <label>
                  <input className='form-checkbox rounded' type='checkbox' title='tos' />
                  <span className='ml-3 text-sm'>
                    Continue if you agree to our{' '}
                    <a
                      href='#'
                      onClick={handleViewTerms}
                      className='text-primary font-bold hover:underline'
                    >
                      Terms
                    </a>{' '}
                    and{' '}
                    <a
                      href='#'
                      onClick={handleViewPivacy}
                      className='text-primary font-bold hover:underline'
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
              <div className='space-y-4'>
                <Button
                  className='w-full'
                  variant='primary'
                  trailing={<HiArrowRight />}
                  type='submit'
                  disabled={mutator.isLoading}
                >
                  Create Account
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
              <div className='text-sm text-muted mb-6 pt-2'>
                Already have an account?{' '}
                <Link className='text-primary font-semibold hover:underline' href='/login'>
                  Click here to login
                </Link>
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
