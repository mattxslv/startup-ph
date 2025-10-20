'use client';
import React, { useRef } from 'react';
import { useProgramById } from './hooks/useProgram';
import Button from '@/ui/button/Button';
import Drawer, { DrawerHandler } from '@/components/input-campaign/Drawer';
import Title from '@/components/home/Title';
import { HiX } from 'react-icons/hi';
import { showLoginModal } from '@/components/program/LoginModal';
import { ApplyForm } from './ApplyForm';

type Props = {
  programId: string;
};

function ProgramAction({ programId }: Props) {
  const { isFetching: isLoading, data, refetch } = useProgramById(programId);
  const applyRef = useRef<DrawerHandler>(null);

  if (isLoading) {
    return (
      <Button className='w-full' variant='primary' type='button'>
        Loading...
      </Button>
    );
  }

  if (!data) {
    return (
      <Button className='w-full' variant='primary' type='button' onClick={showLoginModal}>
        Login to Apply
      </Button>
    );
  }

  if (data.is_open_for_application) {
    return (
      <div>
        <Button
          className='w-full'
          variant='primary'
          onClick={() => {
            applyRef.current!.show({ program_id: programId });
          }}
        >
          Apply
        </Button>
        <Drawer ref={applyRef}>
          {({ props, onClose }) => (
            <div className='absolute top-0 left-0 h-full w-full p-4'>
              <div className='flex justify-between mb-4'>
                <div className='pr-3'>
                  <Title label={`${data.name} requirements`} />
                </div>
                <Button size='xs' onClick={() => onClose()}>
                  <HiX />
                </Button>
              </div>
              <ApplyForm
                isLoading={isLoading}
                requirements={data.requirements}
                programId={props.program_id}
                onSuccess={() => {
                  onClose();
                  refetch();
                }}
              />
            </div>
          )}
        </Drawer>
      </div>
    );
  }

  if (!data.application) return <></>;

  const { status } = data.application;

  if (status === 'FOR RESUBMISSION') {
    return (
      <div className='flex flex-col gap-2'>
        <div className='text-center'>
          <div className='text-sm font-semibold'>Your application has been returned:</div>
          <div className='text-sm border rounded p-1'>{data?.application.remarks}</div>
        </div>
        <Button
          className='w-full'
          variant='primary'
          onClick={() => {
            applyRef.current!.show({ program_id: programId });
          }}
        >
          Re-Submit Application
        </Button>
        <Drawer ref={applyRef}>
          {({ props, onClose }) => (
            <div className='absolute top-0 left-0 h-full w-full p-4'>
              <div className='flex justify-between mb-4'>
                <div className='pr-3'>
                  <Title label={`${data.name} requirements`} />
                </div>
                <Button size='xs' onClick={() => onClose()}>
                  <HiX />
                </Button>
              </div>
              <ApplyForm
                applicationId={data?.application?.id}
                isLoading={isLoading}
                requirements={data.requirements}
                programId={props.program_id}
                onSuccess={() => {
                  onClose();
                  refetch();
                }}
              />
            </div>
          )}
        </Drawer>
      </div>
    );
  }

  if (status === 'REJECTED') {
    return (
      <div className='flex flex-col gap-2'>
        <div className='text-center'>
          <div className='text-sm border rounded p-1'>{data.application.remarks}</div>
        </div>
        <Button className='w-full' variant='danger' disabled>
          Application Rejected
        </Button>
      </div>
    );
  }

  if (status === 'APPROVED') {
    return (
      <div className='flex flex-col gap-2'>
        <Button className='w-full' variant='primary' disabled>
          Approved!
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button className='w-full' variant='primary' disabled>
        Your application is being reviewed
      </Button>
    </div>
  );
}

export default ProgramAction;
