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
      setProgress(0)
      return new Promise((resolve) => {
        uploadClient
          .uploadFile(payload.file, {
            onProgress: (v) => {
              if (v.isComputable) setProgress(v.value as number * 100);
            }
          })
          .then(file => {
            setProgress(null);
            if (file.cdnUrl) resolve(file.cdnUrl)
          })
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
