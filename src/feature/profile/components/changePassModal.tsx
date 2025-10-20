import React, { useState } from 'react';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import { useMutation } from '@tanstack/react-query';
import { ws } from '@/lib';
import { showModal } from '@/components/modal';
import * as yup from 'yup';
import InputPassword from '@/ui/form/InputPassword';
import { PasswordGuide, PasswordMatch } from '@/components/auth/AuthForm';
import Toast from '@/ui/toast/Toast';
import { signOut } from '@/context/my-auth';

export const showChangePasswordModal = () => {
  showModal({
    id: 'change-password',
    title: 'Change Password',
    component: ChangePassForm,
    titleClose: true,
  });
};

interface Props {
  onClose: () => void;
}

interface IPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const INIT_VALUES = {
  current_password: '',
  password: '',
  password_confirmation: '',
};

function useChangePass() {
  return useMutation({
    mutationFn: async (payload: IPayload) =>
      ws.post({
        url: '/api/v2/user/change_password',
        payload,
      }),
  });
}

const validationSchema = yup.object().shape({
  current_password: yup.string().required('Required'),
  password: yup
    .string()
    .required('Required')
    .notOneOf(
      [yup.ref('current_password')],
      'New password must be different from the current password'
    ),
  password_confirmation: yup
    .string()
    .required('Required')
    .notOneOf(
      [yup.ref('current_password')],
      'New password must be different from the current password'
    ),
});

function ChangePassForm({ onClose }: Props) {
  const changePass = useChangePass();
  const [isPassValid, setIsPassValid] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(false);

  const handleSubmit = (payload: IPayload) => {
    changePass.mutate(payload, {
      onSuccess: () => {
        onClose();
        signOut();
        Toast.success('Password changed successfully. You will be logged out.');
      },
    });
  };

  return (
    <Form
      className='flex-1 flex flex-col gap-5'
      onSubmit={handleSubmit}
      initialValues={INIT_VALUES}
      validationSchema={validationSchema}
    >
      <InputPassword name='current_password' label='Enter Current Password' required />
      <div className='flex flex-col'>
        <InputPassword name='password' label='Enter New Password' required />
        <PasswordGuide handlePassValid={setIsPassValid} />
      </div>
      <div className='flex flex-col'>
        <InputPassword name='password_confirmation' label='Confirm New Password' required />
        <PasswordMatch handlePassMatch={setIsPassMatch} />
      </div>

      <div className='flex flex-col justify-center gap-2 mt-4'>
        <Button
          size='sm'
          variant='primary'
          type='submit'
          disabled={changePass.isLoading || !isPassValid || !isPassMatch}
        >
          Change Password
        </Button>

        <Button variant='link' onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
