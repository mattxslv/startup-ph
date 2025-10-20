import Title from '@/components/home/Title';
import { Section } from '@/components/input-campaign/types';
import ViewCampaign from '@/components/input-campaign/ViewCampaign';
import Button from '@/ui/button/Button';
import router from 'next/router';
import React from 'react';
import { HiPencil } from 'react-icons/hi';

interface Props {
  canEdit: boolean;
  body: Section[];
}

const Portfolio = ({ canEdit, body }: Props) => {
  return (
    <>
      <div className='flex items-center gap-1'>
        <Title label='My Portfolio' />
        {canEdit ? (
          <Button
            onChange={() => console.log('edit')}
            variant='link'
            leading={<HiPencil />}
            size='xs'
            onClick={() => {
              router.push('/my-startup/edit');
            }}
          >
            Edit
          </Button>
        ) : null}
      </div>
      {Array.isArray(body) ? <ViewCampaign data={body} /> : null}
      {!body?.length ? (
        <div className='flex justify-center pb-32'>
          <Button
            className='text-primary'
            onClick={() => router.push('/my-startup/edit')}
            variant='primary'
            size='xs'
          >
            Get Started!
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Portfolio;
