import React, { useMemo, useState } from 'react'
import axios from 'axios'
import compressImage from '@/utils/compressImage';

interface Config extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  compress: boolean
}

function useInputFile(onUpload: (file_url: string) => void, config?: Config) {
  const [progress, setProgress] = useState<null | number>(null);
  const render = useMemo(() => {
    const { compress, ...inputProps } = (config || {});
    const fileChanged = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const files = target?.files ?? [];
      if (files.length < 1) return;
      setProgress(0);
      
      const upload = async (f: File) => {
        try {
          // Step 1: Get signed URL from our API
          const signedUrlResponse = await axios.post('/api/upload/generate-signed-url', {
            fileName: f.name,
            contentType: f.type,
          });

          const { signedUrl, publicUrl } = signedUrlResponse.data;

          // Step 2: Upload directly to Google Cloud Storage
          await axios.put(signedUrl, f, {
            headers: {
              'Content-Type': f.type,
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
                setProgress(+percentCompleted.toFixed(2));
              }
            },
          });

          setProgress(null);
          onUpload(publicUrl);
        } catch (error) {
          console.error('Upload error:', error);
          setProgress(null);
        }
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