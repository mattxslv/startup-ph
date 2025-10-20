import React, { useMemo, useState } from 'react'
import uploadClient from '@/lib/uploadcare/uploadClient';
import compressImage from '@/utils/compressImage';

interface Config extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  compress: boolean
}

function useInputFile(onUpload: (file_url: string) => void, config?: Config) {
  const [progress, setProgress] = useState<null | number>(null);
  const render = useMemo(() => {
    const { compress, ...inputProps } = (config || {});
    const fileChanged = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const files = target?.files ?? [];
      if (files.length < 1) return;
      setProgress(0);
      const upload = (f: File) => {
        uploadClient
          .uploadFile(f, {
            onProgress: (v) => {
              if (v.isComputable) setProgress(+(v.value as number * 100).toFixed(2));
            }
          })
          .then(file => {
            setProgress(null);
            if (file.cdnUrl) onUpload(file.cdnUrl)
          })
      }
      if (Boolean(compress)) {
        compressImage(files[0]).then((compressed) => {
          upload(compressed);
        })
        return;
      }
      upload(files[0]);
    }
    return (
      <input className="absolute opacity-0 pointer-events-none w-0" accept="image/*" onChange={fileChanged} type="file" title="input-file" {...inputProps} />
    )
    // eslint-disable-next-line
}, [config])
  return [render, progress];
}

export default useInputFile