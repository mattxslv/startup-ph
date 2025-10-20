/* eslint-disable @next/next/no-img-element */
import { ProgramList } from '@/feature/program';
import HomeLayout from '@/layout/HomeLayout';
import React from 'react';

type Props = {};

function ProgramsPage({}: Props) {
  return (
    <HomeLayout>
      <div className='container mx-auto w-full flex-1'>
        <ProgramList />
      </div>
    </HomeLayout>
  );
}

export default ProgramsPage;
