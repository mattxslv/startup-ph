/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TProgram } from './hooks/useProgram';
import Badge from '@/ui/badge/Badge';
import Button from '@/ui/button/Button';
import Sanitize from '@/components/input-campaign/Sanitize';
import dynamic from 'next/dynamic';

const ProgramAction = dynamic(() => import('./ProgramAction'), {
  ssr: false,
  loading: () => null,
});

type Props = {
  data: TProgram;
};

function Program({ data }: Props) {
  return (
    <div className='space-y-4'>
      <div>
        <h1 className='text-2xl font-bold'>{data.name}</h1>
      </div>
      <div className='flex flex-wrap -mb-1'>
        <Badge className='mr-1 mb-1' variant='primary'>
          {data.agency}
        </Badge>
        <Badge className='mr-1 mb-1' variant='primary'>
          {data.type}
        </Badge>
      </div>
      {data.thumbnail_url ? (
        <div className='w-full max-w-xl mx-auto'>
          <img className='w-full' src={data.thumbnail_url} title={data.name} alt={data.name} />
        </div>
      ) : null}
      <div>
        <Sanitize value={data?.body} />
      </div>
      <ProgramAction programId={data.id} />
    </div>
  );
}

export default Program;
