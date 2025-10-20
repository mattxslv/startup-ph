import useFileUploader from '@/hooks/useFileUploader';
import Button from '@/ui/button/Button';
import compressImage from '@/utils/compressImage';
import formatNumber from '@/utils/formatNumber';
import React, { useCallback, useEffect, useRef } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { HiPencil } from 'react-icons/hi';

type Props = {
  children: React.ReactNode;
  label?: string;
  accept?: string;
  fullClick?: boolean;
  compress?: boolean;
  onUploadSuccess: (newUrl: string) => void;
};

function ToggleFileUpload({
  children,
  label = 'Upload',
  accept = 'image/*',
  fullClick = true,
  compress = false,
  onUploadSuccess,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploader, progress] = useFileUploader();
  const cb = useRef(onUploadSuccess);
  useEffect(() => {
    cb.current = onUploadSuccess;
  }, [onUploadSuccess]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const upload = (f: File) => {
      uploader.mutate(
        { payload: { file: f } },
        {
          onSuccess: (fileUrl: string, x, y) => {
            cb.current(fileUrl);
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
  return (
    <div className='relative h-[30%]'>
      {fullClick ? (
        <button
          className='absolute inset-0 w-full z-30 h-full'
          type='button'
          onClick={() => {
            inputRef.current?.click();
          }}
        />
      ) : null}
      <div className='absolute top-0 right-0 bg-black/20 rounded-bl-lg z-20'>
        <Button
          className='text-white'
          onClick={() => inputRef.current?.click()}
          variant='link'
          leading={isUploading ? <CgSpinner className='animate-spin' /> : <HiPencil />}
          size='xs'
        >
          {isUploading ? `- ${formatNumber(progress, 1)}% -` : label}
        </Button>
      </div>
      {children}
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
  );
}

export default ToggleFileUpload;
