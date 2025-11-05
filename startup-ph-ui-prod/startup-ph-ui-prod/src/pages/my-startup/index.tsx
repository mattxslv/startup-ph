import Splash from '@/components/partial/Splash';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import StartupForm from '@/feature/startup/StartupForm';
import { TStartup } from '@/feature/startup/types';
import HomeLayout from '@/layout/HomeLayout';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const initState: Omit<TStartup, 'id'> = {
  logo_url: '',
  name: '',
  corporation_name: '',
  description: '',
  founder_name: '',
  founding_year: '',
  address_label: '',
  region_code: '',
  province_code: '',
  municipality_code: '',
  barangay_code: '',
  street: '',
  street_two: '',
  postal_code: '',
  social_website_url: '',
  social_instagram_url: '',
  social_facebook_url: '',
  social_linkedin_url: '',
  short_description: '',
  business_classification: '',
  development_phase: '',
  sectors: [],
  tin: '',
  permit_number: '',
  registration_no: '',
  dti_permit_number: '',
  sec_permit_number: '',
  proof_of_registration_url: '',
  banner_url: '',
  body: [],
  assessment_tags: [],
  business_name: '',
  remarks: '',
  fundings: [],
  has_funding: null,
  startup_number: '',
  display_address: '',
  business_certificate_expiration_date: '',
  business_mobile_no: '',
  slug: '',
};

function MyStartupPage({}: Props) {
  const router = useRouter();
  const { isLoading, data } = useMyStartup();
  const isFirstTime = router?.query?.first_time;
  if ((!data && !isFirstTime) || isLoading) return <Splash />;
  return (
    <HomeLayout noFooter>
      <div className='mb-12 bg-white p-5 lg:p-10 rounded-lg'>
        <div className='flex flex-col lg:flex-row'>
          {/* <div className="w-[272px] pr-0 lg:pr-10 lg:border-r">
            list here
          </div> */}
          <div
            // className="flex-1 min-w-0 pl-0 lg:pl-10"
            className='flex-1 min-w-0'
          >
            <StartupForm
              data={data || (initState as TStartup)}
              onSuccess={() => {
                router.push('/dashboard');
              }}
              onBack={
                !isFirstTime
                  ? () => {
                      router.push('/dashboard');
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default MyStartupPage;
