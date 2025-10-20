import useFileUploader from 'hooks/useFileUploader';
import React, { useCallback, useEffect, useRef } from 'react';
import formatNumber from 'utils/formatNumber';

type Props = {
  children: React.ReactNode;
  onUploadSuccess: (newUrl: string) => void;
};

function ImageEdit({ children, onUploadSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploader, progress] = useFileUploader();
  const cb = useRef(onUploadSuccess);
  useEffect(() => {
    cb.current = onUploadSuccess;
  }, [onUploadSuccess]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploader.mutate(
      { payload: { file } },
      {
        onSuccess: (fileUrl: string, x, y) => {
          cb.current(fileUrl);
        },
        onError: () => {
          const el = document.getElementById(
            `input-${name}`
          ) as HTMLInputElement;
          if (el) el.value = '';
        },
      }
    );
  }, []);
  return (
    <div className="relative">
      <button
        className="absolute inset-0 h-full w-full z-30"
        type="button"
        onClick={() => {
          inputRef.current?.click();
        }}
      />
      {children}
      <div className="absolute bottom-0 left-0 w-full bg-black/30 z-20 text-xs text-center py-0.5 text-white">
        {typeof progress === 'number'
          ? `- ${formatNumber(progress, 1)}% -`
          : 'Click to edit'}
      </div>
      <input
        ref={inputRef}
        className="absolute h-0 w-0 pointer-events-none invisible"
        onChange={handleChange}
        defaultValue=""
        type="file"
        accept="image/*"
      />
    </div>
  );
}

export default ImageEdit;
