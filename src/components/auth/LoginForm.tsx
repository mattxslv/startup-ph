import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputPassword from '@/ui/form/InputPassword';
import Image from 'next/image';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
// import Stepper from './Stepper';
import { signIn, useSession } from '@/context/my-auth';
import Link from 'next/link';
import { showForgotPasswordModal } from './ForgotPasswordModal';
import EgovButton from '@/ui/button/EgovButton';
import FormTurnstile from '@/ui/form/FormTurnstile';
import * as yup from 'yup';
interface Props {
  onSuccess?: () => void;
  onBack: () => void;
  onLinkClick?: () => void;
}

interface ILoginForm {
  email: string;
  password: string;
  captcha?: string;
}

const getInitForm = () => ({
  email: sessionStorage.getItem('auth_email') || '',
  password: '',
});

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
  captcha: yup.string().required('Please complete the security check'),
});

function LoginForm({ onBack, onSuccess, onLinkClick }: Props) {
  const session = useSession();

  const handleSubmit = (payload: ILoginForm) => {
    signIn(
      {
        ...payload,
        redirect: '/dashboard',
      },
      () => {
        onSuccess?.();
      }
    );
  };
  return (
    <>
      <Link href='/' className='mb-12'>
        <Image src='/images/logo.png' alt='StartUp Ph' height={55} width={120} />
      </Link>
      {/* <div className='w-56 mb-6'>
        <Stepper index={1} steps={3} />
      </div> */}
      <h1 className='text-dark text-3xl font-semibold mb-3'>Welcome!</h1>
      <p className='text-muted mb-8'>Log in your account</p>

      <Form
        className='flex-1 flex flex-col'
        validationSchema={validationSchema}
        initialValues={getInitForm()}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <>
            <div className='space-y-6'>
              <Input name='email' label='Email Address' required autoFocus />
              <InputPassword name='password' label='Password' required />
              <div>
                <Link
                  className='text-primary font-semibold hover:underline text-sm'
                  href='/auth#forgot-password'
                  onClick={(e) => {
                    e.preventDefault();
                    showForgotPasswordModal(values?.email || '');
                  }}
                >
                  Forgot Password?
                </Link>
              </div>

              {session?.error?.message ? (
                <div>
                  <div className='text-danger font-bold text-sm'>{session?.error?.message}</div>
                </div>
              ) : null}

              <div className='mb-4'>
                <FormTurnstile name='captcha' required />
              </div>

              <div className='space-y-2'>
                <Button
                  className='w-full'
                  variant='primary'
                  trailing={<HiArrowRight />}
                  type='submit'
                  disabled={session?.state === 'authenticating' || !values?.captcha}
                >
                  Log in
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

              <div className='w-full items-center gap-2 flex'>
                <hr className='w-1/2 border-[1.5px]' /> <p className='text-slate-500 text-xs'>OR</p>
                <hr className='w-1/2  border-[1.5px]' />
              </div>

              <EgovButton onLinkClick={onLinkClick} />

              <div className='text-sm text-muted mb-6 pt-2'>
                Don't have an account?{' '}
                <Link
                  className='text-primary font-semibold hover:underline'
                  href='/auth'
                  onClick={onLinkClick}
                >
                  Create your account
                </Link>
              </div>
            </div>
          </>
        )}
      </Form>
    </>
  );
}

export default LoginForm;
