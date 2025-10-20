import Form from '@/ui/form/Form';
import React from 'react';
import * as yup from 'yup';
import { TStartup } from './types';
import { FormikHelpers } from 'formik';
import Title from '@/components/home/Title';
import InputDatasetTags from '../dataset/InputDatasetTags';
import Input from '@/ui/form/Input';
import InputMask from '@/ui/form/InputMask';
import InputTextArea from '@/ui/form/InputTextArea';
import Button from '@/ui/button/Button';
import InputDatasetSelect from '../dataset/InputDatasetSelect';
import { showStartupDevelopmentModal } from '@/components/my-startup/StartupDevelopmentModal';
import { confirmAlert } from '@/components/confirm-alert';
import { HiChevronLeft, HiInformationCircle, HiUpload } from 'react-icons/hi';
import InputFileV2 from '@/ui/form/InputFileV2';
import InputAddressPSGC from '@/ui/form/InputAddressPSGC';
import Toast from '@/ui/toast/Toast';
import { useSaveStartup } from './hooks/useStartupMutate';

type Props = {
  data: TStartup;
  onSuccess?: () => void;
  onBack?: () => void;
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
});

export const StartUpFields = () => {
  return (
    <>
      <div className='flex justify-center pb-4'>
        <InputFileV2
          name='logo_url'
          placeholder={
            <div className='flex items-center justify-center w-full text-gray-400 text-xs'>
              <HiUpload className='w-5 h-5 mr-1' />
              Select Logo
            </div>
          }
          className='w-32 mx-auto'
          imageOnly
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2'>
        <InputDatasetTags code='sector' name='sectors' label='Startup Sector' required />
        <InputDatasetSelect
          code='business-classification'
          name='business_classification'
          label='Business Classification'
          required
        />
        <Input name='name' label='Startup Name' required />
        <Input name='business_name' label='Registered Business/SEC Name' />
        <Input name='founder_name' label='Founder' required />
        <InputMask name='founding_year' label='Founding Year' mask='9999' required type='tel' />
        <InputMask
          name='tin'
          label='Taxpayer Identification Number (TIN)'
          mask='999-999-999-999'
          placeholder='XXX-XXX-XXX-000'
        />
        <InputMask
          name='registration_no'
          label='Registration/Certification Permit Number'
          mask='999999999'
          placeholder='XXXXXXXXXX'
          note='Please ensure
          that your registration/certificate/permit number is aligned with your
          proof of registration.'
        />
        <div className='md:col-span-2 space-y-2'>
          <InputAddressPSGC />
          {/* <InputAddress
            geolocName='address_geoloc'
            valueName='address_label'
            label='Address'
            required
            withPSGC
          /> */}
          <InputTextArea name='description' label='Description' required />
          <Input name='short_description' label='Short Description or Startup One-liner' required />
          <InputDatasetSelect
            code='development-phase'
            name='development_phase'
            label={
              <div className='flex items-center gap-1'>
                <p>Startup Development Phase</p>
                <button type='button' onClick={() => showStartupDevelopmentModal()}>
                  <HiInformationCircle className='text-primary h-4 w-4' />
                </button>
              </div>
            }
            required
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
            note='*PDF, JPG, PNG, DOCX (max. 5mb)'
            inputLabel='Upload Proof or Registration/Government Accreditation'
            className='w-40'
          />
          {/* <InputFileNew
            accept='application/pdf, image/png, image/jpeg, application/msword, application/ms-doc, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            placeholder='Choose file to upload'
            label={'Re-upload'}
            onUploadSuccess={() => {}}
            compress={false}
            fullClick={undefined}
            inputLabel='Upload Proof or Registration/Government Accreditation'
            name='proof_of_registration_url'
            note='*PDF, JPG, PNG, DOCX (max. 5mb)'
          /> */}
        </div>
        <div className='md:col-span-2 space-y-2 py-2'>
          <hr />
        </div>
        <Input name='social_website_url' label='Website URL' />
        <Input name='social_instagram_url' label='Instagram URL' />
        <Input name='social_facebook_url' label='Facebook URL' />
        <Input name='social_linkedin_url' label='LinkedIn URL' />
      </div>
    </>
  );
};

function StartupForm({ data, onSuccess, onBack }: Props) {
  const mutator = useSaveStartup();
  const handleSubmit = (payload: TStartup, { setErrors }: FormikHelpers<TStartup>) => {
    confirmAlert('Are you sure you want to save your changes?', {
      onConfirm: () => {
        const {
          social_website_url,
          social_instagram_url,
          social_facebook_url,
          social_linkedin_url,
        } = payload;
        if (social_website_url && !social_website_url.startsWith('https'))
          payload.social_website_url = `https://${social_website_url}`;
        if (social_instagram_url && !social_instagram_url.startsWith('https'))
          payload.social_instagram_url = `https://${social_instagram_url}`;
        if (social_facebook_url && !social_facebook_url.startsWith('https'))
          payload.social_facebook_url = `https://${social_facebook_url}`;
        if (social_linkedin_url && !social_linkedin_url.startsWith('https'))
          payload.social_linkedin_url = `https://${social_linkedin_url}`;
        mutator.mutate(
          { payload },
          {
            onSuccess: () => {
              onSuccess?.();
            },
            onError: (err: any) => {
              Toast.error('Oops! Something went wrong. Please check your submission and try again');
              if (err?.status === 422) setErrors(err?.errors);
              const firstError = Object.keys(err?.errors)[0];
              const errorElement = document.getElementsByName(firstError);
              errorElement[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
              });
            },
          }
        );
      },
    });
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
      </div>
      <div className='flex items-center -ml-4'>
        {typeof onBack === 'function' ? (
          <Button
            className='text-primary !pl-4'
            variant='link'
            leading={<HiChevronLeft />}
            onClick={() => {
              confirmAlert('Are you sure you want to discard your changes?', {
                onConfirm: onBack,
                confirmLabel: 'Discard',
              });
            }}
          >
            Cancel
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

export default StartupForm;
