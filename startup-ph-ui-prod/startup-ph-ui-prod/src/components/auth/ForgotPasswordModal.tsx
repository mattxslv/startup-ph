import React, { useState } from 'react';
import { showModal } from '../modal';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import { useMutation } from '@tanstack/react-query';
import { ws } from '@/lib';
import Toast from '@/ui/toast/Toast';
import InputPassword from '@/ui/form/InputPassword';
import { PasswordGuide, PasswordMatch } from './AuthForm';
import FormTurnstile from '@/ui/form/FormTurnstile';
import * as yup from 'yup';

export const showForgotPasswordModal = (defaultEmail: string) => {
  showModal({
    id: 'forgot-password',
    title: 'Forgot Password',
    component: ForgotPasswordForm,
    titleClose: true,
    props: {
      defaultEmail,
    },
  });
};

export const showResetPasswordModal = (email: string) => {
  showModal({
    id: 'reset-password',
    title: 'Reset Password',
    component: ResetPasswordForm,
    titleClose: true,
    props: {
      email,
    },
  });
};

interface Props {
  defaultEmail: string;
  onClose: () => void;
}

function useForgotPassword() {
  return useMutation({
    mutationFn: async (payload: { email: string; captcha: string }) =>
      ws.post({
        url: '/api/v2/user/forgot_password',
        payload,
      }),
  });
}

function useResetPassword() {
  return useMutation({
    mutationFn: async (payload: any) =>
      ws.post({
        url: '/api/v2/user/reset_password',
        payload,
      }),
  });
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  captcha: yup.string().required('Please complete the security check'),
});

function ForgotPasswordForm({ defaultEmail, onClose }: Props) {
  const forgetter = useForgotPassword();
  return (
    <Form
      className='flex-1 flex flex-col gap-4'
      initialValues={{ email: defaultEmail }}
      validationSchema={validationSchema}
      onSubmit={(payload) => {
        forgetter.mutate(
          { email: payload.email, captcha: payload.captcha },
          {
            onSuccess: () => {
              Toast.success('Sent!');
              onClose();
              setTimeout(() => {
                showResetPasswordModal(payload.email);
              }, 300);
            },
          }
        );
      }}
    >
      {({ values }) => (
        <>
          <div className='text-sm mb-4 text-description'>
            In order to reset your password, a one-time-pin will be sent to your email address.
          </div>

          <Input name='email' label='Enter Email Address' required />

          <FormTurnstile name='captcha' required />

          <div className='flex flex-col justify-center gap-2 mt-4'>
            <Button
              size='sm'
              variant='primary'
              type='submit'
              disabled={forgetter.isLoading || !values?.captcha}
            >
              Send reset One-Time-PIN
            </Button>

            <Button variant='link' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

function Resend({ email }: { email: string }) {
  const [isSent, setIsSent] = useState(false);
  const forgetter = useForgotPassword();
  if (!isSent)
    return (
      <button
        className='font-semibold text-primary mt-1'
        onClick={() => {
          forgetter.mutate(
            { email, captcha: '' },
            {
              onSuccess: () => {
                setIsSent(true);
              },
            }
          );
        }}
        disabled={forgetter.isLoading}
      >
        Resend
      </button>
    );
  return (
    <button className='font-semibold text-disabled mt-1' disabled>
      Sent
    </button>
  );
}

function ResetPasswordForm({ email, onClose }: { email: string; onClose: () => void }) {
  const resetter = useResetPassword();
  const [isPassValid, setIsPassValid] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(false);

  return (
    <Form
      className='flex-1 flex flex-col'
      initialValues={{ email, pin: '', password: '', password_confirmation: '' }}
      onSubmit={(payload, { setErrors }) => {
        resetter.mutate(payload, {
          onSuccess: () => {
            Toast.success('Password Reset!');
            onClose();
          },
          onError: (err: any) => {
            if (err?.status === 422) setErrors(err?.errors);
          },
        });
      }}
    >
      <div className='space-y-4'>
        <Input name='pin' label='Enter One-Time-PIN' required note={<Resend email={email} />} />
        <div>
          <InputPassword name='password' label='Enter New Password' required />
          <PasswordGuide handlePassValid={setIsPassValid} />
        </div>
        <div>
          <InputPassword name='password_confirmation' label='Re-type Password' required />
          <PasswordMatch handlePassMatch={setIsPassMatch} />
        </div>

        <FormTurnstile name='captcha' required />
      </div>
      <div className='flex flex-col justify-center gap-2 mt-4'>
        <Button
          size='sm'
          variant='primary'
          type='submit'
          disabled={resetter.isLoading || !isPassValid || !isPassMatch}
        >
          Reset Password
        </Button>

        <Button variant='link' onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
