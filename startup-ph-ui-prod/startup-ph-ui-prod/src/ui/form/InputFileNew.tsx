import useFileUploader from '@/hooks/useFileUploader';
import Button from '@/ui/button/Button';
import InputShell from '@/ui/form/InputShell';
import compressImage from '@/utils/compressImage';
import formatNumber from '@/utils/formatNumber';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { HiDocumentText } from 'react-icons/hi';
import { HiCheckCircle } from 'react-icons/hi';
import Image from 'next/image';
import { useFormContext } from '@/ui/form/hooks';

type Props = {
  label?: string;
  inputLabel?: string;
  accept?: string;
  fullClick?: boolean;
  compress?: boolean;
  placeholder: string;
  onUploadSuccess: (newUrl: string) => void;
  name: string;
  note?: string;
};

function InputFileNew({
  label = 'Upload',
  inputLabel,
  accept = 'image/*',
  fullClick = true,
  compress = false,
  placeholder = '',
  onUploadSuccess,
  name,
  note,
}: Props) {
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploader, progress] = useFileUploader();
  const cb = useRef(onUploadSuccess);
  const { values, setFieldValue, errors } = useFormContext();
  const value = values[name];
  const [fallbackImage, setFallbackImage] = useState<string>('');

  useEffect(() => {
    cb.current = onUploadSuccess;
  }, [onUploadSuccess]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const upload = (f: File) => {
      uploader.mutate(
        { payload: { file: f } },
        {
          onSuccess: (fileUrl: string, x, y) => {
            cb.current(fileUrl);
            setFieldValue(name, fileUrl);
            setFallbackImage('');
          },
          onError: () => {
            const el = document.getElementById(`input-${name}`) as HTMLInputElement;
            if (el) el.value = '';
          },
        }
      );
    };
    if (compress) {
      compressImage(file).then((compressed) => {
        upload(compressed);
      });
      return;
    }
    upload(file);
  }, []);
  const isUploading = typeof progress === 'number';
  const error = errors?.[name] as string;
  return (
    <InputShell label={inputLabel} note={error ?? note} error={error}>
      <div className='flex justify-between items-center relative py-2'>
        {fullClick ? (
          <button
            className='absolute h-full w-full z-3 border rounded-md border-blue-500 border-dashed'
            type='button'
            onClick={() => {
              inputRef.current?.click();
            }}
          />
        ) : null}

        {value ? (
          <Image
            onError={() => setFallbackImage('/images/icons/document.png')}
            src={fallbackImage || value}
            width={50}
            height={50}
            alt={'Proof'}
            className=' ml-2'
          />
        ) : (
          <div className='flex items-center gap-1 ml-2'>
            <HiDocumentText color='#1e40af' />
            {fileName ? (
              <p className='flex items-center gap-1 text-xs underline text-blue-700'>
                {fileName} {isUploading ? '' : <HiCheckCircle color='green' />}
              </p>
            ) : (
              <p className='text-xs text-muted'>{placeholder}</p>
            )}
          </div>
        )}
        <div className='  bg-black/20 rounded-lg z-20 mr-2'>
          <Button
            className='text-white '
            onClick={() => inputRef.current?.click()}
            variant='primary'
            leading={isUploading ? <CgSpinner className='animate-spin' /> : ''}
            size='xs'
          >
            {isUploading ? `- ${formatNumber(progress, 1)}% -` : label}
          </Button>
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full bg-black/30 z-20 text-xs text-center py-0.5 text-white">

      </div> */}
        <input
          ref={inputRef}
          className='absolute h-0 w-0 pointer-events-none invisible'
          onChange={handleChange}
          defaultValue=''
          type='file'
          accept={accept}
        />
      </div>
    </InputShell>
  );
}

export default InputFileNew;
