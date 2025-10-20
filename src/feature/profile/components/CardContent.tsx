import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import Button from '@/ui/button/Button';
import useProfile, { IProfile } from '@/hooks/useProfile';
import { ProfilePageForm } from '@/feature/profile';
import Title from '@/components/home/Title';
import Form from '@/ui/form/Form';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import Toast from '@/ui/toast/Toast';
import { showChangePasswordModal } from './changePassModal';

const CardContent = () => {
  const { data: profile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const mutator = useUpdateProfile();
  const handleSubmit = (payload: IProfile, { resetForm }: any) => {
    mutator.mutate(
      {
        payload: {
          ...payload,
          first_name: payload.first_name.toUpperCase(),
          middle_name: payload?.middle_name?.toUpperCase(),
          last_name: payload.last_name.toUpperCase(),
        },
      },
      {
        onSuccess: () => {
          Toast.success('Profile updated successfully');
          resetForm({ values: payload });
          setIsEditing(false);
        },
        onError: (err: any) => {
          const errors = Object.values(err?.errors)[0];
          if (!errors || !Array.isArray(errors)) Toast.error('Something went wrong');
          Toast.error((errors as Array<string>).join(', '));
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit} initialValues={profile} className='flex flex-col gap-8'>
      {({ dirty, resetForm }) => (
        <>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <Title label='My Profile' />
              {!profile?._is_profile_from_sso ? (
                <Button
                  type='button'
                  onClick={() => {
                    isEditing && resetForm?.({ values: profile });
                    setIsEditing((prev) => !prev);
                  }}
                  size='xs'
                  variant='link'
                  leading={<HiPencil />}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              ) : null}
            </div>
            <Button size='xs' type='button' onClick={() => showChangePasswordModal()}>
              Change Password
            </Button>
          </div>
          <ProfilePageForm
            isEditing={isEditing}
            profile={profile}
            cancelEdit={() => {
              isEditing && resetForm?.({ values: profile });
              setIsEditing((prev) => !prev);
            }}
            isLoading={mutator.isLoading}
            isDirty={Boolean(dirty)}
          />
        </>
      )}
    </Form>
  );
};

export default CardContent;
