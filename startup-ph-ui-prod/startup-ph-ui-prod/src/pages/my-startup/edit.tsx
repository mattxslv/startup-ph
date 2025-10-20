import { confirmAlert } from '@/components/confirm-alert';
import { InputCampaign } from '@/components/input-campaign';
import { Section } from '@/components/input-campaign/types';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import { TStartup } from '@/feature/startup/types';
import HomeLayout from '@/layout/HomeLayout';
import Button from '@/ui/button/Button';
import clsx from 'clsx';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HiArrowLeft, HiOutlineReply } from 'react-icons/hi';

type Props = {
  initData: TStartup;
};

const empty: Array<Section> = [];

function EditPage({ initData }: Props) {
  const [value, setValue] = useState<Array<Section>>(initData?.body || empty);
  const isDirty = !isEqual(value, initData?.body || empty);
  const router = useRouter();
  const mutator = useSaveStartup();
  const handleSave = () => {
    mutator.mutate(
      {
        payload: {
          ...initData,
          body: value,
        },
      },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
      }
    );
  };
  return (
    <HomeLayout noFooter>
      <div className='flex-1 flex flex-col max-w-5xl mx-auto w-full'>
        <div className='px-4 mb-4'>
          {isDirty ? (
            <Button
              className='text-primary'
              variant='link'
              size='sm'
              onClick={() => {
                confirmAlert('Are you sure you want to discard changes?', {
                  confirmLabel: 'Discard Changes',
                  onConfirm: () => {
                    router.replace('/dashboard');
                  },
                });
              }}
              leading={<HiOutlineReply />}
            >
              Discard Changes
            </Button>
          ) : (
            <Button
              className='text-primary'
              variant='link'
              size='sm'
              onClick={() => router.push('/dashboard')}
              leading={<HiArrowLeft />}
            >
              Go back
            </Button>
          )}
        </div>
        <InputCampaign onChange={(x) => setValue(x)} value={value} />
      </div>
      <div
        className={clsx(
          'fixed bottom-0 left-0 w-full bg-danger z-[40] text-white py-3 px-4 ease-in-out transition-all',
          isDirty ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className='max-w-lg mx-auto w-full flex items-center'>
          <div className='text-xs font-semibold mr-auto'>You have unsaved changes</div>
          <Button
            className='w-[142px]'
            size='sm'
            variant='light'
            onClick={handleSave}
            disabled={mutator.isLoading}
          >
            {mutator.isLoading ? 'Loading...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}

function MyStartupEditPage() {
  const { isLoading, data } = useMyStartup();
  if (!data) {
    return (
      <HomeLayout noFooter>
        <div className='text-center'>
          {isLoading ? 'Loading...' : 'Unable to load data. Please refresh the page and try again.'}
        </div>
      </HomeLayout>
    );
  }
  return <EditPage initData={data} />;
}

export default MyStartupEditPage;
