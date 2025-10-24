import Form from '@/ui/form/Form';
import React, { useState } from 'react';
import * as yup from 'yup';
import { TStartup } from '../../startup/types';
import { FormikHelpers } from 'formik';
import InputDatasetSelect from '../../dataset/InputDatasetSelect';
import InputMask from '@/ui/form/InputMask';
import Input from '@/ui/form/Input';
import Button from '@/ui/button/Button';
import { showOathModal } from '@/components/partial/oath';
import { showConsentModal } from '@/components/partial/consent';
import { useRouter } from 'next/router';
import Toast from '@/ui/toast/Toast';
import InputFileV2 from '@/ui/form/InputFileV2';
import { HiUpload } from 'react-icons/hi';
import { showVerifySuccessModal } from '@/components/partial/VerifySuccessModal';
import useMyStartup from '../../startup/hooks/useMyStartup';
import { useSubmitStartup, useResubmitStartup } from '../../startup/hooks/useStartupMutate';

const handleOath = (e: any) => {
  e.preventDefault();
  showOathModal();
};
const handleConsent = (e: any) => {
  e.preventDefault();
  showConsentModal();
};
const validationSchema = yup.object().shape({
  tin: yup.string().required('Required'),
  registration_no: yup.string().required('Required'),
  business_classification: yup.string().required('Required'),
  development_phase: yup.string().required('Required'),
  proof_of_registration_url: yup.string().required('Required'),
});

export const GetVerifiedFields = () => {
  return (
    <div className='flex flex-col gap-x-4 gap-y-2 mb-6'>
      <InputMask
        name='tin'
        label='Taxpayer Identification Number (TIN) '
        mask='999-999-999-999'
        placeholder='XXX-XXX-XXX-000'
        required
      />
      <Input
        name='registration_no'
        label='DTI/SEC Registration Number'
        placeholder='Enter DTI or SEC number'
        note='Please enter your DTI Registration Number or SEC Number. Ensure this matches your proof of registration document.'
        required
      />
      <InputDatasetSelect
        code='business-classification'
        name='business_classification'
        label='Business Classification'
        required
        fallbackOptions={[
          { label: 'Service Provider', value: 'Service Provider' },
          { label: 'Manufacturing', value: 'Manufacturing' },
          { label: 'Technology', value: 'Technology' },
          { label: 'Retail/E-commerce', value: 'Retail/E-commerce' },
          { label: 'Food & Beverage', value: 'Food & Beverage' },
          { label: 'Healthcare', value: 'Healthcare' },
          { label: 'Education', value: 'Education' },
          { label: 'Agriculture', value: 'Agriculture' },
          { label: 'Finance', value: 'Finance' },
          { label: 'Other', value: 'Other' }
        ]}
      />
      <InputDatasetSelect
        code='development-phase'
        name='development_phase'
        label='Development Phase'
        required
        fallbackOptions={[
          { label: 'Ideation Stage', value: 'Ideation Stage' },
          { label: 'Validation Stage', value: 'Validation Stage' },
          { label: 'Early Stage', value: 'Early Stage' },
          { label: 'Growth Stage', value: 'Growth Stage' },
          { label: 'Expansion Stage', value: 'Expansion Stage' },
          { label: 'Maturity Stage', value: 'Maturity Stage' }
        ]}
      />

      <InputFileV2
        accept={[
          'application/pdf',
          'image/png',
          'image/jpg',
          'image/jpeg',
          'application/msword',
          'application/ms-doc',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]}
        name='proof_of_registration_url'
        placeholder={
          <div className='flex items-center justify-center w-full text-gray-400 text-xs'>
            <HiUpload className='w-5 h-5 mr-1' />
            Choose file to upload
          </div>
        }
        note='*PDF, JPG, PNG, DOCX (max. 25mb)'
        inputLabel='Upload Proof or Registration/Government Accreditation'
        className='w-40'
        required
      />
    </div>
  );
};
interface Props {
  onClose: () => void;
}
function GetVerifiedForm({ onClose }: Props) {
  const [isOath, setIsOath] = useState(false);
  const { data } = useMyStartup();
  // const formData: Partial<TStartup> = {
  //   tin: data?.tin,
  //   registration_no: data?.registration_no || '',
  //   business_classification: data?.business_classification || '',
  //   development_phase: data?.development_phase || '',
  //   proof_of_registration_url: data?.proof_of_registration_url || '',
  // };
  const router = useRouter();
  // const mutator = useSaveStartup();
  const submitor = useSubmitStartup();
  const resubmitor = useResubmitStartup();

  const handleSubmit = (payload: TStartup, { setErrors }: FormikHelpers<TStartup>) => {
    console.log('🚀 GetVerified Form Payload:', payload);
    const args = {
      onSuccess: () => {
        onClose();
        // router.push('/get-verified/success');
        showVerifySuccessModal();
      },
      onError: (err: any) => {
        console.log('🚨 GetVerified Form Error:', err);
        if (err?.status === 422) {
          Toast.error(err?.message);
          setErrors(err?.errors);
        } else {
          Toast.error(err?.message || 'Something went wrong. Please try again later.');
        }
      },
    };
    // mutator.mutate(
    //   { payload },
    //   {
    //     onSuccess: () => {
    //       data?.status === 'FOR RESUBMISSION'
    //         ? resubmitor.mutate({}, args)
    //         : submitor.mutate({}, args);
    //     },
    //     onError: (err: any) => {
    //       console.log(err?.errors);
    //       if (err?.status === 422) setErrors(err?.errors);
    //     },
    //   }
    // );
    data?.status === 'FOR RESUBMISSION'
      ? resubmitor.mutate({ payload }, args)
      : submitor.mutate({ payload }, args);
  };

  const initialValues = {
    // Required fields for verification
    tin: data?.tin || '',
    registration_no: data?.registration_no || '',
    business_classification: data?.business_classification || '',
    development_phase: data?.development_phase || '',
    proof_of_registration_url: data?.proof_of_registration_url || '',
    // Include all other existing startup data
    ...data,
  };

  console.log('🚀 GetVerified Initial Values:', initialValues);
  console.log('🚀 MyStartup Data:', data);

  return (
    <Form
      className='flex-1 flex flex-col'
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className='space-y-2 mb-6'>
        <GetVerifiedFields />
        <label className='text-gray-600 mt-4'>
          <input
            className='form-checkbox rounded'
            type='checkbox'
            title='tos'
            onChange={(e) => setIsOath(e.target.checked)}
            checked={isOath}
          />
          <span className='ml-3 text-sm'>
            I hereby agree to the{' '}
            <a href='#' onClick={handleOath} className='text-primary font-bold hover:underline'>
              Oath of Undertaking
            </a>{' '}
            and{' '}
            <a href='#' onClick={handleConsent} className='text-primary font-bold hover:underline'>
              Consent
            </a>{' '}
            as outlined in the provided content.
          </span>
        </label>
      </div>
      <div className='flex items-center justify-end'>
        <Button className='text-primary !pl-4' variant='link' onClick={onClose}>
          Cancel
        </Button>

        <span />
        <Button
          className='ml-auto md:ml-0'
          variant='primary'
          type='submit'
          // disabled={mutator.isLoading || submitor.isLoading || !isOath}
          disabled={submitor.isLoading || !isOath}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default GetVerifiedForm;
