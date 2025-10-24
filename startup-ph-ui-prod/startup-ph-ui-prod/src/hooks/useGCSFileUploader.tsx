import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

interface IPayload {
  payload: {
    file: File;
  };
}

const useGCSFileUploader = (): [
  UseMutationResult<string, unknown, IPayload, unknown>,
  null | number
] => {
  const [progress, setProgress] = useState<null | number>(null);

  const mutator = useMutation({
    mutationFn: async ({ payload }: IPayload) => {
      console.log('📤 Starting GCS upload for file:', payload.file.name);
      setProgress(0);

      try {
        // Step 1: Get signed URL from our API
        const { data } = await axios.post('/api/upload/generate-signed-url', {
          fileName: payload.file.name,
          contentType: payload.file.type,
        });

        console.log('🔑 Signed URL obtained');

        // Step 2: Upload directly to Google Cloud Storage
        await axios.put(data.signedUrl, payload.file, {
          headers: {
            'Content-Type': payload.file.type,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
              console.log('📊 Upload progress:', percentCompleted + '%');
            }
          },
        });

        console.log('✅ Upload successful');
        console.log('🔗 Public URL:', data.publicUrl);
        
        setProgress(null);
        return data.publicUrl;
      } catch (error) {
        console.error('❌ GCS upload error:', error);
        setProgress(null);
        throw error;
      }
    },
    onSuccess: () => {
      setProgress(null);
    },
    onError: () => {
      setProgress(null);
    },
  });

  return [mutator, progress];
};

export default useGCSFileUploader;
