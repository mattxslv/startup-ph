import Splash from '@/components/partial/Splash';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import ResubmitForm from '@/feature/startup/ResubmitForm';
import HomeLayout from '@/layout/HomeLayout';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

function ResubmitPage({}: Props) {
  const router = useRouter();
  const { data } = useMyStartup();
  if (!data) return <Splash />;
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
            <ResubmitForm
              data={data}
              onSuccess={() => {
                router.push('/get-verified/success');
              }}
              onBack={() => {
                router.push('/dashboard');
              }}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ResubmitPage;
