import Form from '@/ui/form/Form';
import React, { useState, useContext } from 'react';
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
import { useSaveStartup, useGetVerifiedMutation, useResubmitStartup } from '../../startup/hooks/useStartupMutate';
import { FormContext } from '@/ui/form/context';
import { useFormContext } from '@/ui/form/hooks';

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
  dti_permit_number: yup.string().nullable().test(
    'one-required',
    'Either DTI or SEC permit number is required',
    function(value) {
      const { sec_permit_number } = this.parent;
      return !!(value && value.trim()) || !!(sec_permit_number && sec_permit_number.trim());
    }
  ),
  sec_permit_number: yup.string().nullable().test(
    'one-required',
    'Either DTI or SEC permit number is required', 
    function(value) {
      const { dti_permit_number } = this.parent;
      return !!(value && value.trim()) || !!(dti_permit_number && dti_permit_number.trim());
    }
  ),
  business_classification: yup.string().required('Required'),
  development_phase: yup.string().required('Required'),
  proof_of_registration_url: yup.string().required('Required'),
  is_oath_accepted: yup.boolean().oneOf([true], 'You must accept the Oath of Undertaking and Consent'),
}, [['dti_permit_number', 'sec_permit_number']]);

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
        label='Business Registration Number'
        placeholder='Enter your business registration number'
        note='Your official business registration number from DTI or SEC'
        required
      />
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
          name='dti_permit_number'
          label='DTI Permit Number *'
          placeholder='Enter DTI number (if applicable)'
          required={true}
        />
        <Input
          name='sec_permit_number'
          label='SEC Permit Number *'
          placeholder='Enter SEC number (if applicable)'
          required={true}
        />
      </div>
      <div className='text-xs text-description -mt-3'>
        Enter either DTI or SEC number (at least one is required)
      </div>
      
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

const SubmitButton = () => {
  const formik = useContext(FormContext);
  const values = formik?.values as TStartup & { is_oath_accepted: boolean };
  const isSubmitting = formik?.isSubmitting || false;
  
  return (
    <Button
      className='ml-auto md:ml-0'
      variant='primary'
      type='submit'
      disabled={isSubmitting || !values?.is_oath_accepted}
    >
      Submit
    </Button>
  );
};

const CheckboxField = ({ name }: { name: string }) => {
  const { values, setFieldValue } = useFormContext();
  const checked = values[name] || false;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.checked);
  };
  
  return (
    <input
      className='form-checkbox rounded'
      type='checkbox'
      name={name}
      title='tos'
      checked={checked}
      onChange={handleChange}
    />
  );
};

interface Props {
  onClose: () => void;
}
function GetVerifiedForm({ onClose }: Props) {
  const { data } = useMyStartup();
  // const formData: Partial<TStartup> = {
  //   tin: data?.tin,
  //   registration_no: data?.registration_no || '',
  //   business_classification: data?.business_classification || '',
  //   development_phase: data?.development_phase || '',
  //   proof_of_registration_url: data?.proof_of_registration_url || '',
  // };
  const router = useRouter();
  const mutator = useSaveStartup();
  const submitor = useGetVerifiedMutation();
  const resubmitor = useResubmitStartup();

  const handleSubmit = (payload: TStartup, { setErrors }: FormikHelpers<TStartup>) => {
    console.log('🚀 GetVerified Form Payload:', payload);
    console.log('🚀 DTI Permit Number in payload:', payload.dti_permit_number);
    console.log('🚀 SEC Permit Number in payload:', payload.sec_permit_number);
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
    
    if (data?.status === 'FOR RESUBMISSION') {
      // For resubmission, save first then resubmit
      // Add default values for required fields if they're missing
      const enhancedPayload = {
        ...payload,
        // Provide defaults for required fields if missing from existing data
        logo_url: data?.logo_url || payload.logo_url || 'https://via.placeholder.com/150',
        founder_name: data?.founder_name || payload.founder_name || 'Founder',
        province_code: data?.province_code || payload.province_code || '012900000', // Default to NCR
        municipality_code: data?.municipality_code || payload.municipality_code || '012904000', 
        barangay_code: data?.barangay_code || payload.barangay_code || '012904015',
        content: (data as any)?.content || (payload as any)?.content || { 
          banner_url: 'https://via.placeholder.com/800x400',
          body: [{ type: 'RICHTEXT', content: payload.description || data?.description || 'Company description' }]
        }
      };
      
      mutator.mutate(
        { payload: enhancedPayload },
        {
          onSuccess: () => {
            resubmitor.mutate({ payload: {} }, args);
          },
          onError: (err: any) => {
            console.log('🚨 GetVerified Form Save Error:', err?.errors);
            if (err?.status === 422) setErrors(err?.errors);
          },
        }
      );
    } else {
      // For initial submission
      submitor.mutate({ payload }, args);
    }
  };

  const initialValues = {
    // Required fields for verification
    tin: data?.tin || '',
    registration_no: data?.registration_no || '',
    dti_permit_number: data?.dti_permit_number || '',
    sec_permit_number: data?.sec_permit_number || '',
    business_classification: data?.business_classification || '',
    development_phase: data?.development_phase || '',
    proof_of_registration_url: data?.proof_of_registration_url || '',
    is_oath_accepted: false,
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
          <CheckboxField name='is_oath_accepted' />
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
        <SubmitButton />
      </div>
    </Form>
  );
}

export default GetVerifiedForm;
