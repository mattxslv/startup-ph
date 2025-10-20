import AuthWrapper from '@/layout/AuthWrapper';
import Stepper from '@/components/auth/Stepper';
import InputDatasetTags from '@/feature/dataset/InputDatasetTags';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputTextArea from '@/ui/form/InputTextArea';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import Title from '@/components/home/Title';
import Button from '@/ui/button/Button';
import { HiArrowRight } from 'react-icons/hi';
import { TStartup } from '@/feature/startup/types';
import useDatasetOptions from '@/feature/dataset/useDatasetOptions';
import InputYear from '@/ui/form/InputYear';
import InputAddressPSGC from '@/ui/form/InputAddressPSGC';
import useProfile from '@/hooks/useProfile';
import { isEmpty } from 'lodash';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';

const getInitForm = (): TStartup => ({
  sectors: sessionStorage.getItem('sectors') ? sessionStorage.getItem('sectors')!.split(',') : [],
  name: sessionStorage.getItem('name') || '',
  address_label: sessionStorage.getItem('address_label') || '',
  founder_name: sessionStorage.getItem('founder_name') || '',
  founding_year: sessionStorage.getItem('founding_year') || '',
  short_description: sessionStorage.getItem('short_description') || '',
  description: sessionStorage.getItem('description') || '',
  id: '',
  logo_url: '',
  // address
  region_code: sessionStorage.getItem('region_code') || '',
  province_code: sessionStorage.getItem('province_code') || '',
  municipality_code: sessionStorage.getItem('municipality_code') || '',
  barangay_code: sessionStorage.getItem('barangay_code') || '',
  street: sessionStorage.getItem('street') || '',
  street_two: sessionStorage.getItem('street_two') || '',
  postal_code: sessionStorage.getItem('postal_code') || '',
  // social
  social_website_url: '',
  social_instagram_url: '',
  social_facebook_url: '',
  social_linkedin_url: '',
  business_classification: '',
  development_phase: '',
  tin: '',
  status: 'UNVERIFIED',
  // content start
  banner_url: '',
  body: undefined,
  // content end
  permit_number: '',
  assessment_tags: [],
  registration_no: '',
  proof_of_registration_url: '',
  business_name: '',
  remarks: '',

  fundings: [],
  has_funding: null,
  startup_number: '',
  display_address: '',
  business_certificate_expiration_date: '',
  business_mobile_no: '',
  slug: '',
});

export const StartUpFields = () => {
  return (
    <>
      <div className='grid-cols-1  gap-4'>
        <InputDatasetTags code='sector' name='sectors' label='Startup Sector' required />
        <Input name='name' label='Startup Name' required />
        <p className='text-xs text-muted mb-4'>
          Please ensure that your business name is registered with DTI or SEC to avoid any legal
          issues in the future.
        </p>
        <InputYear
          name='founding_year'
          label='Founding Year'
          // mask="9999"
          required
          min={new Date(1900, 1, 1)}
          max={new Date()}
        />
        <InputAddressPSGC />
        {/* <div className='md:col-span-2 space-y-2'>
          <InputAddress
            geolocName='address_geoloc'
            valueName='address_label'
            label='Business Address'
            required
            withPSGC
          />
        </div> */}
        <Input name='founder_name' label='Founder Name' required />

        <Input
          name='short_description'
          label='Short Description or Startup One-liner'
          note='Indicate the problem that your Startup is trying to solve and your startup’s solution to
          the problem'
          required
          showCounter
          maxLength={250}
        />
        <InputTextArea name='description' label='Description' required />
      </div>
    </>
  );
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  sectors: yup.array().of(yup.string().required('Required')),
  founder_name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  founding_year: yup.string().required('Required'),
  short_description: yup.string().required('Required'),
  region_code: yup.string().required('Required'),
  province_code: yup.string().required('Required'),
  municipality_code: yup.string().required('Required'),
  barangay_code: yup.string().required('Required'),
  street: yup.string().required('Required'),
});

export default function StartupForm() {
  const { isLoading, data } = useDatasetOptions('sector');
  const { isFetching: isFetchingProfile, data: profile } = useProfile();
  const router = useRouter();
  const mutator = useSaveStartup();
  const getAddressLabel = (payload: TStartup) => {
    const street = payload['street'];
    const street_two = payload['street_two'];
    const postal_code = payload['postal_code'];
    return `${street} ${street_two}, ${postal_code}`;
  };
  useEffect(() => {
    if (isFetchingProfile) return;
    if (!profile || isEmpty(profile)) return;
    if (sessionStorage.getItem('first_name')) return;
    sessionStorage.setItem('first_name', profile.first_name);
    sessionStorage.setItem('middle_name', profile.middle_name);
    sessionStorage.setItem('last_name', profile.last_name);
    sessionStorage.setItem('gender', profile.gender);
    sessionStorage.setItem('birth_date', profile.birth_date);
    sessionStorage.setItem('mobile_no', profile.mobile_no);
  }, [isFetchingProfile]);
  const handleSubmit = (payload: TStartup) => {
    sessionStorage.setItem('sectors', payload.sectors.join(','));
    sessionStorage.setItem('name', payload.name);
    sessionStorage.setItem('region_code', payload.region_code);
    sessionStorage.setItem('province_code', payload.province_code);
    sessionStorage.setItem('municipality_code', payload.municipality_code);
    sessionStorage.setItem('barangay_code', payload.barangay_code);
    sessionStorage.setItem('street', payload.street);
    sessionStorage.setItem('street_two', payload.street_two);
    sessionStorage.setItem('postal_code', payload.postal_code);
    sessionStorage.setItem('address_label', getAddressLabel(payload));
    sessionStorage.setItem('founder_name', payload.founder_name);
    sessionStorage.setItem('short_description', payload.short_description);
    sessionStorage.setItem('description', payload.description);
    sessionStorage.setItem('founding_year', payload.founding_year);
    router.push('/profile/summary');
  };

  if (!data) {
    return (
      <div className='text-center'>
        {isLoading ? 'Loading...' : 'Unable to load data. Please refresh the page and try again.'}
      </div>
    );
  }
  return (
    <AuthWrapper animated={false}>
      <Link href='/'>
        <Image className='mb-8' src='/images/logo.png' alt='StartUp Ph' height={55} width={144} />
      </Link>
      <div className='w-56 mb-6'>
        <Stepper index={2} steps={2} />
      </div>
      <div className='text-dark text-3xl font-semibold'>Startup Information</div>
      <div className='text-muted mb-8'>
        Give the community a short description about who you are.
      </div>
      <Form
        className='flex-1 flex flex-col'
        initialValues={/* data || */ getInitForm()}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <div className='mb-4 flex items-center space-x-2'>
          <Title label='Business Information' />
        </div>
        <div className='space-y-2 mb-6'>
          {' '}
          <StartUpFields />
        </div>
        <div className='flex justify-end items-center '>
          <div className='flex-1 text-sm text-muted hidden lg:flex'>
            You can always edit or add more information in your Account Details
          </div>
          <Button
            className=' !pl-4'
            variant='link'
            // disabled={profile?._is_profile_from_sso}
            onClick={() => {
              router.push('/profile/update');
            }}
          >
            Back
          </Button>

          <Button
            className='ml-auto md:ml-0'
            variant='primary'
            trailing={<HiArrowRight />}
            type='submit'
            disabled={mutator.isLoading}
          >
            Continue
          </Button>
        </div>
      </Form>
    </AuthWrapper>
  );
}
