import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import { TStartup } from '@/feature/startup/types';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputAddressPSGC from '@/ui/form/InputAddressPSGC';
import InputMobile from '@/ui/form/InputMobile';
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  founder_name: yup.string().required('Required'),
  region_code: yup.string().required('Required'),
  province_code: yup.string().required('Required'),
  municipality_code: yup.string().required('Required'),
});

interface IProps {
  onClose: () => void;
}

const Contact = ({ onClose }: IProps) => {
  const { data } = useMyStartup();
  const mutator = useSaveStartup();

  const handleSubmit = (payload: TStartup) => {
    mutator.mutate({ payload }, { onSuccess: () => onClose() });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={data}
      validationSchema={validationSchema}
      className='flex flex-col gap-5'
    >
      {({ dirty }) => (
        <>
          <Input name='founder_name' label='Founder' required />

          <InputMobile name='business_mobile_no' label='Business Contact Number' />

          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Business Address</p>

            <InputAddressPSGC />
          </div>

          <div className='flex items-center justify-end gap-4 mt-5'>
            <Button variant='link' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='primary' type='submit' disabled={!dirty}>
              Save
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default Contact;
