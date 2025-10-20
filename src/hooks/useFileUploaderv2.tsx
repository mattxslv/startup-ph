import { post } from '@/lib/ws/service';
import { queryClient } from '@/lib';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { AxiosResponse } from 'axios';

interface UploadResponse {
  file_name: string;
  file_size: number;
  file_size_human: string;
  mime_type: string;
  url: string;
}

interface FileWithProgress extends File {
  progress?: number;
  url?: string;
  error?: string;
}

interface UploadOptions {
  onProgress?: (progress: number, file: File) => void;
  endpoint?: string;
}

interface UploadResult {
  url: string;
  filename: string;
}

const defaultEndpoint = `/ext/${process.env.NEXT_PUBLIC_UPLOADER_PROJECT}/upload`; // default endpoint if none provided

export const useFileUpload = (options: UploadOptions = {}) => {
  const { endpoint = defaultEndpoint, onProgress } = options;

  const uploadFile = async (file: FileWithProgress): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await post<AxiosResponse>(
      {
        url: endpoint,
        payload: formData,
        isUpload: true,
      },
      {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;

          onProgress?.(progress, file);
        },
      }
    );
    const resData = response.data.data as UploadResponse;

    return {
      url: resData.url,
      filename: resData.file_name,
    };
  };

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ['files'] });

      // Optionally update cache
      queryClient.setQueryData(['files'], (old: UploadResult[] = []) => {
        return [...old, data];
      });
    },
  });

  return mutation;
};

// Optional: Create a hook for multiple file uploads
export const useMultipleFileUpload = (options: UploadOptions = {}) => {
  const { endpoint = defaultEndpoint, onProgress } = options;

  const uploadFiles = async (files: FileWithProgress[]): Promise<UploadResult[]> => {
    const uploads = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);

      return post<AxiosResponse>(
        {
          url: endpoint,
          payload: formData,
          isUpload: true,
        },
        {
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;

            onProgress?.(progress, file);
          },
        }
      );
    });

    const results = await Promise.all(uploads);
    return results.map((response) => ({
      url: response.data.data.url,
      filename: response.data.data.file_name,
    }));
  };

  const mutation = useMutation({
    mutationFn: uploadFiles,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['files'] });

      queryClient.setQueryData(['files'], (old: UploadResult[] = []) => {
        return [...old, ...data];
      });
    },
  });

  return mutation;
};
