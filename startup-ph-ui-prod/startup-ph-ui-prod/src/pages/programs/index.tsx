/* eslint-disable @next/next/no-img-element */
import DevelopedBy from '@/components/partial/DevelopedBy';
import { ProgramList } from '@/feature/program';
import HomeLayout from '@/layout/HomeLayout';
import React from 'react';

type Props = {};

function ProgramsPage({}: Props) {
  return (
    <HomeLayout>
      <div className='container mx-auto w-full flex-1'>
        <div className='bg-white p-6 rounded-none lg:rounded-lg relative'>
          <ProgramList />
        </div>
      </div>
      <div className='w-full'>
        <DevelopedBy />
      </div>
    </HomeLayout>
  );
}

export default ProgramsPage;
