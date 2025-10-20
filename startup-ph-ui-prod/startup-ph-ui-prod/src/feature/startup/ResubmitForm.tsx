import Form from '@/ui/form/Form';
import React from 'react';
import * as yup from 'yup';
import { TStartup } from './types';
import { FormikHelpers } from 'formik';
import Title from '@/components/home/Title';
import Button from '@/ui/button/Button';
import { HiChevronLeft } from 'react-icons/hi';
import { StartUpFields } from './StartupForm';
import { GetVerifiedFields } from '../home/components/GetVerifiedForm';
import { confirmAlert } from '@/components/confirm-alert';
import { useSaveStartup, useResubmitStartup } from './hooks/useStartupMutate';

type Props = {
  data: TStartup;
  onSuccess?: () => void;
  onBack?: () => void;
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
});

function ResubmitForm({ data, onSuccess, onBack }: Props) {
  const mutator = useSaveStartup();
  const resubmitor = useResubmitStartup();
  const handleSubmit = (payload: TStartup, { setErrors }: FormikHelpers<TStartup>) => {
    mutator.mutate(
      { payload },
      {
        onSuccess: () => {
          confirmAlert('Re-submit and get verified?', {
            onConfirm: () => {
              resubmitor.mutate(
                { payload },
                {
                  onSuccess: () => {
                    onSuccess?.();
                  },
                }
              );
            },
          });
        },
        onError: (err: any) => {
          if (err?.status === 422) setErrors(err?.errors);
        },
      }
    );
  };
  return (
    <Form
      className='flex-1 flex flex-col'
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className='mb-4 flex items-center space-x-2'>
        <Title label='Business Information' />
      </div>
      <div className='space-y-2 mb-6'>
        <StartUpFields />
        <GetVerifiedFields />
      </div>
      <div className='flex items-center -ml-4'>
        {typeof onBack === 'function' ? (
          <Button
            className='text-primary !pl-4'
            variant='link'
            leading={<HiChevronLeft />}
            onClick={onBack}
          >
            Back
          </Button>
        ) : null}
        <span className='ml-auto' />
        <Button
          className='ml-auto md:ml-0'
          variant='primary'
          type='submit'
          disabled={mutator.isLoading}
        >
          Save
        </Button>
      </div>
    </Form>
  );
}

export default ResubmitForm;
