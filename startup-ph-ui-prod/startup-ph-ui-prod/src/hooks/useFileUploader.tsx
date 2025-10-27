import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'

interface IPayload {
  payload: {
    file: any
  }
}

const useFileUploader = (): [UseMutationResult<any, unknown, IPayload, unknown>, null | number] => {
  const [progress, setProgress] = useState<null | number>(null)
  const mutator = useMutation({
    mutationFn: async ({ payload }: IPayload) => {
      console.log('📤 Starting Google Cloud Storage upload for file:', payload.file.name);
      setProgress(0)
      
      try {
        // Step 1: Get signed URL from our API
        const signedUrlResponse = await axios.post('/api/upload/generate-signed-url', {
          fileName: payload.file.name,
          contentType: payload.file.type,
        });

        const { signedUrl, publicUrl } = signedUrlResponse.data;
        console.log('🔗 Signed URL obtained');

        // Step 2: Upload directly to Google Cloud Storage
        await axios.put(signedUrl, payload.file, {
          headers: {
            'Content-Type': payload.file.type,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percentCompleted);
              console.log('📊 Upload progress:', percentCompleted + '%');
            }
          },
        });

        console.log('✅ File uploaded successfully to GCS');
        console.log('🔗 Public URL:', publicUrl);
        setProgress(null);
        return publicUrl;
      } catch (error) {
        console.error('❌ GCS upload error:', error);
        setProgress(null);
        throw error;
      }
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
