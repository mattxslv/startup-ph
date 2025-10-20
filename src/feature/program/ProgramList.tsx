/* eslint-disable @next/next/no-img-element */
import React, { SyntheticEvent, useState } from 'react';
import { useProgramList } from './hooks/useProgram';
import { useRouter } from 'next/router';
import Badge from '@/ui/badge/Badge';
import useDatasetOptions from '../dataset/useDatasetOptions';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';

interface Filter {
  page: number;
  q: string;
  'agency[]': string | number;
}

type Props = {};

function ProgramList({}: Props) {
  const [filter, setFilter] = useState<Filter>({ page: 1, 'agency[]': '', q: '' });
  const { isFetching, data } = useProgramList(filter);
  const { data: agency } = useDatasetOptions('agency');
  const list = data?.list || [];
  const router = useRouter();
  const handleSubmit = (payload: object) => {
    setFilter({ ...filter, ...payload });
  };
  return (
    <div>
      <div className='font-bold text-2xl mb-6'>Programs</div>

      <Form
        className='flex items-center gap-2 mb-3'
        onSubmit={handleSubmit}
        initialValues={{ q: '' }}
      >
        <Input name='q' placeholder='Search...' className='h-12' />
        <Button variant='primary' type='submit' className='mb-2'>
          Search
        </Button>
      </Form>

      {(agency?.options || []).length > 1 ? (
        <div className='mb-6'>
          <div className='flex flex-wrap -mb-2'>
            <button className='mb-2 mr-2' onClick={() => setFilter({ ...filter, 'agency[]': '' })}>
              <Badge variant={filter['agency[]'] === '' ? 'primary' : 'base'}>All</Badge>
            </button>
            {(agency?.options || []).map((item) => (
              <button
                key={item.value}
                className='mb-2 mr-2'
                onClick={() => setFilter({ ...filter, 'agency[]': item.value })}
              >
                <Badge variant={filter['agency[]'] === item.value ? 'primary' : 'base'}>
                  {item.label} Programs
                </Badge>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className='grid grid-cols-1 gap-3'>
        {isFetching ? (
          <div className='h-[160px] w-full bg-gray-100 animate-pulse rounded-lg' />
        ) : list.length === 0 ? (
          <div className='text-center text-gray-500'>No Programs Found</div>
        ) : (
          list.map((item) => (
            <div key={item.id} className='bg-white/60 rounded-lg p-2 relative flex'>
              <button
                className='absolute inset-0 h-full w-full z-10'
                onClick={() => {
                  router.push(`/programs/${item.id}`);
                }}
              ></button>
              <div className='w-24 md:w-40 mr-3'>
                <div className='relative pt-[100%] bg-slate-200 mb-1'>
                  {item.thumbnail_url ? (
                    <img
                      className='absolute inset-0 h-full w-full object-cover object-center'
                      src={item.thumbnail_url}
                      alt={item.name}
                      title={item.name}
                    />
                  ) : (
                    <div className='absolute inset-0 h-full w-full flex'>
                      <span className='m-auto text-xs font-bold text-slate-400'>No Thumbnail</span>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex-1 min-w-0'>
                <div className='font-bold text-[#323232] mb-1'>{item.name}</div>
                <div className='text-xs text-[#323232] mb-4'>
                  <span className='opacity-60'>Application Period: </span>
                  {item.date_human}
                </div>
                <div className='text-xs text-description'>{item.description}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProgramList;
