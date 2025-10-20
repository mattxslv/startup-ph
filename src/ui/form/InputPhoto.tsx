import useInputFile from '@/hooks/useInputFile';
import clsx from 'clsx';
import React from 'react';
import { useFormContext } from './hooks';
import Image from 'next/image';
import { HiCamera } from 'react-icons/hi';

type Props = {
  name: string;
  disabled?: boolean;
  placeholder?: string;
};

function InputPhoto({ name, disabled = false, placeholder = 'Logo' }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const [input, progress] = useInputFile(
    (photo_url: string) => {
      setFieldValue(name, photo_url);
    },
    { compress: true }
  );
  const value = values?.[name] || '';
  const error = errors?.[name] as string;
  return (
    <div>
      <label className='relative mr-10 inline-block'>
        <div
          className={clsx(
            'flex inset-0 absolute z-10 bg-black/30 h-28 w-28 rounded-2xl cursor-pointer',
            typeof progress === 'number'
              ? 'opacity-100'
              : `${!disabled ? 'hover:opacity-100' : ''} opacity-0`
          )}
        >
          {typeof progress === 'number' ? (
            <span className='text-white text-xs m-auto'>{progress}%</span>
          ) : (
            <span
              className={clsx('text-white text-xs m-auto', !disabled ? 'opacity-100' : 'opacity-0')}
            >
              Upload
            </span>
          )}
        </div>
        <div className='rounded-2xl border-2 border-white bg-[#E1E1E2] flex h-28 w-28 overflow-hidden relative'>
          {value ? (
            <Image
              className='object-center object-contain inset-0 absolute h-full w-full'
              fill
              src={value}
              sizes='96px'
              alt=''
            />
          ) : (
            <span className='text-white m-auto text-xl text-center font-light tracking-tighter'>
              {placeholder}
            </span>
          )}
        </div>
        {!disabled ? (
          <>
            <div className='absolute bottom-0 right-0 h-7 w-7 rounded-full bg-white border flex z-20'>
              <HiCamera className='m-auto h-4 w-4 text-muted' />
            </div>
            {input}
          </>
        ) : null}
      </label>
      {typeof error === 'string' ? (
        <div className={clsx('text-xs', error ? 'text-danger' : 'text-muted')}>{error}</div>
      ) : null}
    </div>
  );
}

export default InputPhoto;
