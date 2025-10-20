import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosProgressEvent } from 'axios';
import { ws } from 'lib';
import { useState } from 'react';

interface IPayload {
  payload: {
    file: any;
  };
}

const useUploader = (): [
  UseMutationResult<any, unknown, IPayload, unknown>,
  null | number
] => {
  const [progress, setProgress] = useState<null | number>(null);
  const mutator = useMutation({
    mutationFn: async ({ payload }: IPayload) => {
      setProgress(0);
      return ws.post(
        {
          url: '/core/files/upload',
          payload: (() => {
            const form = new FormData();
            form.append('file', payload.file);
            return form;
          })(),
          transform: ({ data }) => data?.file_url,
        },
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          onUploadProgress: (e: AxiosProgressEvent) => {
            setProgress(Math.round((e.loaded * 100) / (e.total ?? 0)));
          },
        }
      );
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

export default useUploader;
