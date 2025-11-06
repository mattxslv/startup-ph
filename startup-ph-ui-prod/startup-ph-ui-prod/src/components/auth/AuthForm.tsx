'use client';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import Stepper from './Stepper';
import Toast from '@/ui/toast/Toast';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import InputPassword from '@/ui/form/InputPassword';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import useAuthenticateViaEmail from '@/hooks/useAuthenticateViaEmail';
import { showTermsModal } from '../partial/TermsAndConditions';
import { showPrivacyModal } from '../partial/PrivacyPolicy';
import { useFormContext } from '@/ui/form/hooks';

const LoginForm = dynamic(() => import('./LoginForm'), {
  ssr: false,
  loading: () => <div />,
});
const RegisterForm = dynamic(() => import('./RegisterForm'), {
  ssr: false,
  loading: () => <div />,
});

interface IAuthForm {
  email: string;
  password: string;
  password_confirmation: string;
  user_type?: 'visitor' | 'startup' | 'enabler';
}

const getInitForm = (): IAuthForm => ({
  email: '',
  password: '',
  password_confirmation: '',
  user_type: 'startup',
});

export function PasswordGuide({
  handlePassValid,
}: {
  handlePassValid: (isValid: boolean) => void;
}) {
  const { values } = useFormContext();
  const isLengthOk = values.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(values.password);
  const hasLowercase = /[a-z]/.test(values.password);
  const hasSymbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(values.password);
  const hasNumber = /[0-9]/.test(values.password);
  const allCriteriaMet = isLengthOk && hasUppercase && hasLowercase && hasSymbol && hasNumber;

  useEffect(() => {
    handlePassValid(allCriteriaMet);
  }, [values?.password]);

  return (
    <div className='text-xs text-description leading-4 mt-2'>
      Minimum of{' '}
      <span className={clsx(isLengthOk ? 'text-success' : 'text-danger')}>8 characters</span>,
      contains both{' '}
      <span className={clsx(hasUppercase ? 'text-success' : 'text-danger')}>uppercase</span> and{' '}
      <span className={clsx(hasLowercase ? 'text-success' : 'text-danger')}>lowercase</span>{' '}
      letters,{' '}
      <span className={clsx(hasSymbol ? 'text-success' : 'text-danger')}>at least one symbol</span>{' '}
      and{' '}
      <span className={clsx(hasNumber ? 'text-success' : 'text-danger')}>at least one number</span>
    </div>
  );
}

export function PasswordMatch({
  handlePassMatch,
}: {
  handlePassMatch: (isMatch: boolean) => void;
}) {
  const { values } = useFormContext();

  useEffect(() => {
    handlePassMatch(values.password === values.password_confirmation);
  }, [values.password, values.password_confirmation]);

  if (!values.password && !values.password_confirmation) return <div />;
  if (values.password === values.password_confirmation) {
    return <div className='text-xs text-success leading-4 mt-2'>Matched</div>;
  }
  return <div className='text-xs text-danger leading-4 mt-2'>Does not match</div>;
}

function hasWhiteSpace(s: string) {
  return /\s/g.test(s);
}

function AuthForm() {
  const [isPassValid, setIsPassValid] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const router = useRouter();
  const mutator = useAuthenticateViaEmail();
  const [state, setState] = useState<'VERIFIED' | 'UNVERIFIED' | undefined>(undefined);
  const handleSubmit = (payload: IAuthForm) => {
    if (
      hasWhiteSpace(payload.email) ||
      hasWhiteSpace(payload.password) ||
      hasWhiteSpace(payload.password_confirmation)
    ) {
      Toast.error('White space not allowed in email or password.');
      return;
    }
    mutator.mutate(
      { email: payload.email },
      {
        onSuccess: (res) => {
          if (res === 'VERIFIED') {
            // Email already exists, show error message
            Toast.error(
              `This email address is already registered. Please login to access your account.`
            );
            return;
          }
          
          if (res === 'UNVERIFIED') {
            // New user, proceed with registration
            sessionStorage.setItem('auth_email', payload.email);
            sessionStorage.setItem('password', payload.password);
            sessionStorage.setItem('passConfirmation', payload.password_confirmation);
            sessionStorage.setItem('user_type', payload.user_type || 'startup');
            
            Toast.success('A 6-Digit-PIN has been sent to your email address.');
            setState(res);
            return;
          }
          
          // Fallback
          setState('UNVERIFIED');
        },
        onError: (err: any) => {
          Toast.error(err?.message);
        },
      }
    );
  };
  if (state === 'VERIFIED')
    return (
      <LoginForm
        key='login'
        onBack={() => setState(undefined)}
        onSuccess={() => {
          router.push('/dashboard');
        }}
      />
    );
  if (state === 'UNVERIFIED')
    return (
      <RegisterForm
        key='register'
        onBack={() => setState(undefined)}
        onSuccess={() => {
          router.push('/profile/update');
        }}
      />
    );

  const handleViewTerms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showTermsModal();
  };
  const handleViewPivacy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showPrivacyModal();
  };

  const handlePassValid = (isValid: boolean) => {
    setIsPassValid(isValid);
    updateFormValidation(isValid, isPassMatch, isChecked);
  };
  const handlePassMatch = (isMatch: boolean) => {
    setIsPassMatch(isMatch);
    updateFormValidation(isPassValid, isMatch, isChecked);
  };
  const handleCheck = (event: any) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    updateFormValidation(isPassValid, isPassMatch, newChecked);
  };
  const updateFormValidation = (isPass: boolean, isMatch: boolean, newChecked: boolean) => {
    const isValid = isPass && isMatch && newChecked;
    setIsFormValid(isValid);
  };
  return (
    <>
      <Link href='/'>
        <Image className='mb-8' src='/images/logo.png' alt='StartUp Ph' height={55} width={144} />
      </Link>
      <div className='w-56 mb-6'>
        <Stepper index={1} steps={2} />
      </div>
      <div className='text-dark text-3xl font-semibold'>Create your account</div>
      <div className='text-muted mb-8'>We just need a few details, and you’ll be on your way. </div>
      <Form className='flex-1 flex flex-col' initialValues={getInitForm()} onSubmit={handleSubmit}>
        <div className='space-y-3 mb-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>I am a...</label>
            <div className='flex gap-4'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='user_type'
                  value='startup'
                  defaultChecked
                  className='form-radio text-primary focus:ring-primary'
                />
                <span className='text-sm'>Startup</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='user_type'
                  value='enabler'
                  className='form-radio text-primary focus:ring-primary'
                />
                <span className='text-sm'>Enabler</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name='user_type'
                  value='visitor'
                  className='form-radio text-primary focus:ring-primary'
                />
                <span className='text-sm'>Visitor</span>
              </label>
            </div>
            <p className='text-xs text-muted'>
              Select 'Startup' if you're registering a business, 'Enabler' if you support startups, or 'Visitor' if you're just browsing.
            </p>
          </div>
          <div className=' flex flex-col gap-2'>
            <Input name='email' label='Email Address' required autoFocus />
            <p className='text-xs text-muted'>
              This address will be used for receiving updates in the status of your registration and
              programs application.
            </p>
          </div>
          <div>
            <InputPassword name='password' label='Password' required />
            <PasswordGuide handlePassValid={handlePassValid} />
          </div>
          <div>
            <InputPassword name='password_confirmation' label='Confirm Password' required />
            <PasswordMatch handlePassMatch={handlePassMatch} />
          </div>

          <div>
            <label>
              <input
                className='form-checkbox rounded'
                type='checkbox'
                title='tos'
                onClick={(e) => handleCheck(e)}
              />
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
              disabled={mutator.isLoading || !isFormValid || !isPassMatch}
            >
              Create Account
            </Button>
            <Button className='w-full' variant='link' onClick={() => router.back()}>
              Back
            </Button>
            {/* <div className='w-full items-center gap-2 flex'>
                  <hr className='w-1/2 border-[1.5px]' />{' '}
                  <p className='text-slate-500 text-xs'>OR</p>
                  <hr className='w-1/2  border-[1.5px]' />
                </div>
                <div className='w-full'>
                  <Button
                    variant='link'
                    type='submit'
                   disabled={session?.state === "authenticating"}
                    className='w-full bg-blue-50'
                  >
                    <div className='w-full flex gap-2 text-xs font-normal items-center'>
                      Sign up with your
                      <Image src='/images/egov.svg' alt='StartUp Ph' height={60} width={60} />
                      account
                    </div>
                  </Button>
                </div> */}
          </div>
          <div className='text-sm text-muted mb-6 pt-2'>
            Already have an account?{' '}
            <Link className='text-primary font-semibold hover:underline' href='/login'>
              Login
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
