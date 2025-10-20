import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiUpload, HiX } from 'react-icons/hi';
import { useFileUpload, useMultipleFileUpload } from '@/hooks/useFileUploaderv2';
import Toast from '../toast/Toast';

export interface UploadResponse {
  url: string;
  filename: string;
}

export interface FileWithProgress extends File {
  progress?: number;
  url?: string;
  error?: string;
}

interface FileUploaderProps {
  accept?: string[];
  maxSize?: number;
  maxFiles?: number;
  endpoint?: string;
  onUploadComplete?: (urls: string[]) => void;
  value?: string[];
  error?: string;
  className?: string;
  onFileRemove?: (index: number) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept = ['image/*', 'application/pdf'],
  maxSize = 5 * 1024 * 1024,
  maxFiles = 10,
  endpoint = '/ext/staging/upload',
  onUploadComplete,
  value = [],
  error,
  className = '',
  onFileRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileWithProgress[]>(() =>
    value.map(
      (url) =>
        ({
          name: url.split('/').pop() || 'file',
          url,
          progress: 100,
        } as FileWithProgress)
    )
  );
  const [dragActive, setDragActive] = useState(false);
  const { mutate: uploadSingle, isLoading: isUploading } = useFileUpload({
    endpoint,
    onProgress: (progress, file) => {
      setFiles((current) =>
        current.map((f) => (f.name === file.name ? ({ ...f, progress } as FileWithProgress) : f))
      );
    },
  });
  const { mutate: uploadMultiple, isLoading: isUploadingMultiple } = useMultipleFileUpload({
    endpoint,
    onProgress: (progress, file) => {
      setFiles((current) =>
        current.map((f) => (f.name === file.name ? ({ ...f, progress } as FileWithProgress) : f))
      );
    },
  });

  useEffect(() => {
    const newFiles = value.map(
      (url) =>
        ({
          name: url.split('/').pop() || 'file',
          url,
          progress: 100,
        } as FileWithProgress)
    );

    setFiles(newFiles);
  }, [value]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    if (
      !accept.some((type) => {
        if (type.includes('/*')) {
          const baseType = type.split('/')[0];
          return file.type.startsWith(baseType);
        }
        return file.type === type;
      })
    ) {
      const errorMsg = `File type not accepted: ${file.name}`;
      Toast.error(errorMsg);
      return errorMsg;
    }

    if (file.size > maxSize) {
      const errorMsg = `File size exceeds ${maxSize / (1024 * 1024)}MB: ${file.name}`;
      Toast.error(errorMsg);
      return errorMsg;
    }

    return null;
  };

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const validFiles: FileWithProgress[] = [];
      const currentCount = files.length;
      let hasError = false; // Add this flag

      Array.from(newFiles).forEach((file) => {
        if (currentCount + validFiles.length >= maxFiles) {
          Toast.error(`Maximum ${maxFiles} files allowed`);
          hasError = true; // Set error flag
          return;
        }

        const error = validateFile(file);
        if (!error) {
          const fileWithProgress = Object.assign(file, {
            progress: 0,
            url: undefined,
            error: undefined,
          }) as FileWithProgress;

          validFiles.push(fileWithProgress);
        } else {
          hasError = true; // Set error flag
        }
      });

      // Only proceed if there are no validation errors
      if (!hasError && validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles]);

        // Use multiple upload if more than one file, otherwise use single upload
        if (validFiles.length > 1) {
          uploadMultiple(validFiles, {
            onSuccess: (results) => {
              onUploadComplete?.(results.map((r) => r.url));
            },
            onError: (error) => {
              console.error('Upload failed:', error);
              Toast.error('Upload failed');
            },
          });
        } else if (validFiles.length === 1) {
          uploadSingle(validFiles[0], {
            onSuccess: (result) => {
              onUploadComplete?.([result.url]);
            },
            onError: (error) => {
              console.error('Upload failed:', error);
              Toast.error('Upload failed');
            },
          });
        }
      }
    },
    [files, maxFiles, uploadMultiple, uploadSingle, onUploadComplete]
  );

  const removeFile = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    onFileRemove?.(index);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length + files.length > maxFiles) {
        Toast.error(`Maximum ${maxFiles} files allowed`);
        return;
      }

      handleFiles(droppedFiles);
    },
    [handleFiles, files.length, maxFiles]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length + files.length > maxFiles) {
      Toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    handleFiles(selectedFiles);
    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
        relative
        min-h-[200px]
        border-2
        border-dashed
        rounded-lg
        ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${error ? 'border-red-500' : ''}
        ${isUploading || isUploadingMultiple ? 'opacity-50 pointer-events-none' : ''}
        transition-colors
      `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label
          className={`absolute inset-0 cursor-pointer z-10 ${
            isUploading || isUploadingMultiple ? 'pointer-events-none' : ''
          }`}
        >
          <input
            type='file'
            multiple
            accept={accept.join(',')}
            onChange={handleChange}
            className='sr-only'
            disabled={isUploading || isUploadingMultiple}
            ref={fileInputRef}
          />
          {files.length === 0 && <div className='absolute inset-0' />}
        </label>

        <div className='flex flex-col items-center justify-center p-6 text-center'>
          {files.length === 0 ? (
            <>
              <HiUpload className='w-10 h-10 text-gray-400 mb-3' />
              <p className='text-gray-600'>Drag & drop files here or click to select</p>
              <p className='text-sm text-gray-400 mt-1'>Accepted files: {accept.join(', ')}</p>
              <p className='text-sm text-gray-400'>Max size: {maxSize / (1024 * 1024)}MB</p>
            </>
          ) : (
            <div className='w-full relative z-20'>
              <div className='grid gap-2'>
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className='flex items-center justify-between p-2 bg-gray-50 rounded'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center space-x-2 truncate'>
                        <span className='text-sm font-medium truncate'>{file.name}</span>
                        {file.size && (
                          <span className='text-xs text-gray-500'>
                            ({formatFileSize(file.size)})
                          </span>
                        )}
                      </div>
                      {file.progress !== undefined && file.progress < 100 && !file.error && (
                        <div className='w-full h-1 bg-gray-200 rounded-full mt-1'>
                          <div
                            className='h-full bg-blue-500 rounded-full transition-all'
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                      {file.error && <p className='text-xs text-red-500 mt-1'>{file.error}</p>}
                    </div>
                    <button
                      type='button'
                      onClick={(e) => removeFile(e, index)}
                      className='p-1 hover:bg-gray-200 rounded z-30 ml-2'
                      disabled={isUploading || isUploadingMultiple}
                    >
                      <HiX className='w-4 h-4 text-gray-500' />
                    </button>
                  </div>
                ))}
              </div>
              {files.length < maxFiles && (
                <p
                  className='text-sm text-gray-400 mt-2 text-center cursor-pointer'
                  onClick={triggerFileInput}
                >
                  Drop more files or click to select
                </p>
              )}
            </div>
          )}
        </div>

        {(isUploading || isUploadingMultiple) && (
          <div className='absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
          </div>
        )}
      </div>

      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default FileUploader;
