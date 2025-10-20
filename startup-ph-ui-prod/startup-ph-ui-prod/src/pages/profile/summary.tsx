import AuthWrapper from '@/layout/AuthWrapper';
import Stepper from '@/components/auth/Stepper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '@/ui/button/Button';
import { HiCheck } from 'react-icons/hi';
import useDatasetOptions from '@/feature/dataset/useDatasetOptions';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import useProfile, { IProfile } from '@/hooks/useProfile';
import { TStartup } from '@/feature/startup/types';
import { FormikHelpers } from 'formik';
import Toast from '@/ui/toast/Toast';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';

const InputData = {
  personalInfo: [
    {
      title: 'First Name',
      content: 'first_name',
      className: 'uppercase',
    },
    {
      title: 'Middle Name',
      content: 'middle_name',
      className: 'uppercase',
    },
    {
      title: 'Last Name',
      content: 'last_name',
      className: 'uppercase',
    },
    {
      title: 'Extension Name',
      content: 'suffix_name',
      className: 'uppercase',
    },
    {
      title: 'Sex',
      content: 'gender',
    },
    {
      title: 'Birth Date',
      content: 'birth_date',
    },
    {
      title: 'Mobile Number',
      content: 'mobile_no',
    },
  ],
};

const transformGenderValue = (gender: string | null): 'Male' | 'Female' | 'Prefer not to say' => {
  switch (gender) {
    case 'M':
      return 'Male';
    case 'F':
      return 'Female';
    default:
      return 'Prefer not to say';
  }
};

interface IForm extends TStartup, IProfile {}
export default function Summary({ setErrors }: FormikHelpers<IForm>) {
  useProfile();
  const { isLoading, data } = useDatasetOptions('sector');
  const router = useRouter();
  const mutator = useUpdateProfile();
  const mutator2 = useSaveStartup();

  const handleSubmit = async () => {
    const profileData: Partial<IProfile> = {
      first_name: sessionStorage.getItem('first_name')?.toUpperCase() || '',
      middle_name: sessionStorage.getItem('middle_name')?.toUpperCase() || '',
      last_name: sessionStorage.getItem('last_name')?.toUpperCase() || '',
      suffix_name: sessionStorage.getItem('suffix_name')?.toUpperCase() || '',
      gender: sessionStorage.getItem('gender') || '',
      birth_date: sessionStorage.getItem('birth_date') || '',
      mobile_no: sessionStorage.getItem('mobile_no') || '',
    };

    const startupData: Partial<TStartup> = {
      sectors: sessionStorage.getItem('sectors')?.split(',') || [''],
      name: sessionStorage.getItem('name') || '',
      address_label: sessionStorage.getItem('address_label') || '',
      founder_name: sessionStorage.getItem('founder_name') || '',
      short_description: sessionStorage.getItem('short_description') || '',
      description: sessionStorage.getItem('description') || '',
      founding_year: sessionStorage.getItem('founding_year') || '',
      id: '',
      logo_url: '',
      region_code: sessionStorage.getItem('region_code') || '',
      province_code: sessionStorage.getItem('province_code') || '',
      municipality_code: sessionStorage.getItem('municipality_code') || '',
      barangay_code: sessionStorage.getItem('barangay_code') || '',
      street: sessionStorage.getItem('street') || '',
      street_two: sessionStorage.getItem('street_two') || '',
      postal_code: sessionStorage.getItem('postal_code') || '',
      social_website_url: '',
      social_instagram_url: '',
      social_facebook_url: '',
      social_linkedin_url: '',
      business_classification: '',
      development_phase: '',
      tin: '',
      status: 'VERIFIED',
      banner_url: '',
      body: undefined,
    };

    mutator.mutate(
      { payload: profileData },
      {
        onSuccess: (data: any) => {
          mutator2.mutate(
            { payload: startupData },
            {
              onSuccess: (data: any) => {
                sessionStorage.clear();
                router.push('/dashboard');
                Toast.success(
                  'Congratulations! Your account has been successfully created. Welcome to StartUp PH!'
                );
              },
              onError: (err: any) => {
                if (err?.status === 422) {
                  Toast.error(err?.message);
                  setErrors(err?.errors);
                  return;
                }
              },
            }
          );
        },
        onError: (err: any) => {
          if (err?.status === 422) {
            Toast.error(err?.message);
            setErrors(err?.errors);
            return;
          }
        },
      }
    );
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
        <Stepper index={3} steps={2} />
      </div>
      <div className='text-dark text-3xl font-semibold py-4'>Summary</div>
      <div className='mb-4 flex flex-col text-muted gap-6'>
        <div className=' flex flex-col gap-4'>
          <h1 className='text-base'>Personal Information</h1>
          <div className='flex flex-col gap-2'>
            {InputData.personalInfo.map((info, index) => (
              <div key={index} className=' grid grid-cols-35/65 '>
                <h1 className='text-sm font-semibold'>{info.title}</h1>
                <h1 className={info.className || ''}>
                  {info.content === 'gender'
                    ? transformGenderValue(sessionStorage.getItem(info.content)) || 'N/A'
                    : sessionStorage.getItem(info.content) || 'N/A'}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className=' flex flex-col gap-4 '>
          <h1 className='text-base'>Business Information</h1>
          <div className='flex flex-col'>
            <div className=' grid grid-cols-35/65 gap-y-2'>
              <h1 className='text-sm font-semibold'>Startup Sector</h1>
              <h1 className='truncate'>{sessionStorage.getItem('sectors') || 'N/A'}</h1>
              <h1 className='text-sm font-semibold'>Startup Name</h1>
              <h1>{sessionStorage.getItem('name') || 'N/A'}</h1>
              <h1 className='text-sm font-semibold'>Founding Year</h1>
              <h1>{sessionStorage.getItem('founding_year') || 'N/A'}</h1>
              {/* <h1 className='text-sm font-semibold'>Business Address</h1>
              <h1>{sessionStorage.getItem('address_label') || 'N/A'}</h1> */}
              <h1 className='text-sm font-semibold'>Founder</h1>
              <h1>{sessionStorage.getItem('founder_name') || 'N/A'}</h1>
              <h1 className='text-sm font-semibold'>Short Description</h1>
              <h1>{sessionStorage.getItem('short_description') || 'N/A'}</h1>
              <h1 className='text-sm font-semibold'>Description</h1>
              <h1 className='overflow-y-auto mb-10'>
                {sessionStorage.getItem('description') || 'N/A'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end items-center '>
        <div className='flex-1 text-sm text-muted hidden lg:flex'>
          You can always edit or add more information in your Account Details
        </div>
        <Button
          className=' !pl-4'
          variant='link'
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>

        <Button
          className='ml-auto md:ml-0'
          variant='primary'
          trailing={<HiCheck />}
          onClick={handleSubmit}
          disabled={mutator.isLoading}
        >
          Confirm
        </Button>
      </div>
    </AuthWrapper>
  );
}
