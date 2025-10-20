import * as yup from 'yup';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputTextArea from '@/ui/form/InputTextArea';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Toast from '@/ui/toast/Toast';
import useSubmitContactUs from './useSubmitContactUs';
import { FormikHelpers } from 'formik';

interface IContactUsForm {
  email: string;
  name: string;
  subject: string;
  body: string;
}

const INIT_FORM = {
  email: '',
  name: '',
  subject: '',
  body: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  name: yup.string().required('Required'),
  subject: yup.string().required('Required'),
  body: yup.string().required('Required'),
});

function ContactUsForm() {
  const mutator = useSubmitContactUs();
  const handleSubmit = (
    payload: IContactUsForm,
    { setErrors, resetForm }: FormikHelpers<IContactUsForm>
  ) => {
    mutator.mutate(
      { payload },
      {
        onSuccess: () => {
          Toast.success(`Thank you for contacting us. We'll get back to you soon!`);
          resetForm({ values: INIT_FORM });
        },
        onError: (err: any) => {
          if (err?.status === 422) setErrors(err?.errors);
        },
      }
    );
  };
  return (
    <>
      <Form
        className='flex-1 flex flex-col'
        initialValues={INIT_FORM}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <div className='space-y-2 mb-6'>
          <div>
            <Input name='email' label='Email Address' required type='email' />
          </div>
          <div>
            <Input name='name' label='Name' required />
          </div>
          <div>
            <Input name='subject' label='Subject' required />
          </div>
          <div>
            <InputTextArea name='body' label='Message' required />
          </div>
        </div>
        <div className='flex items-center justify-end mt-auto'>
          <Button
            variant='primary'
            trailing={<HiArrowRight />}
            type='submit'
            disabled={mutator.isLoading}
          >
            Send your Message
          </Button>
        </div>
      </Form>
    </>
  );
}

export default ContactUsForm;
