import uploadClient from '@/lib/uploadcare/uploadClient'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { useState } from 'react'

interface IPayload {
  payload: {
    file: any
  }
}

const useFileUploader = (): [UseMutationResult<any, unknown, IPayload, unknown>, null | number] => {
  const [progress, setProgress] = useState<null | number>(null)
  const mutator = useMutation({
    mutationFn: async ({ payload }: IPayload) => {
      console.log('📤 Starting Uploadcare upload for file:', payload.file.name);
      setProgress(0)
      return new Promise((resolve, reject) => {
        uploadClient
          .uploadFile(payload.file, {
            publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUB_KEY,
            store: 'auto',
            onProgress: (v) => {
              if (v.isComputable) {
                const progressValue = v.value as number * 100;
                setProgress(progressValue);
                console.log('📊 Upload progress:', Math.round(progressValue) + '%');
              }
            }
          })
          .then(file => {
            console.log('✅ Uploadcare response:', file);
            setProgress(null);
            if (file.cdnUrl) {
              console.log('🔗 CDN URL obtained:', file.cdnUrl);
              resolve(file.cdnUrl);
            } else {
              console.error('❌ No CDN URL in response');
              reject(new Error('No CDN URL received'));
            }
          })
          .catch(error => {
            console.error('❌ Uploadcare upload error:', error);
            setProgress(null);
            reject(error);
          });
      });
    },
    onSuccess: () => {
      setProgress(null)
    },
    onError: () => {
      setProgress(null)
    }
  })
  return [mutator, progress]
}

export default useFileUploader
