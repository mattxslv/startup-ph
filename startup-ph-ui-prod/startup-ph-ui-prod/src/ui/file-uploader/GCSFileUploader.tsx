import clsx from 'clsx';
import { ReactNode, useRef, useState } from 'react';
import { HiTrash, HiUpload } from 'react-icons/hi';
import useGCSFileUploader from '@/hooks/useGCSFileUploader';
import Image from 'next/image';

interface Props {
  className?: string;
  disabled?: boolean;
  placeholder?: ReactNode | JSX.Element;
  accept?: Array<string>;
  maxFileSize?: number;
  file?: any;
  onChange?: (e: any) => void;
  handleDelete?: () => void;
  customRender?: ReactNode | JSX.Element;
  options?: Array<'file' | 'camera'>;
}

const GCSFileUploader = ({
  className,
  disabled,
  placeholder,
  accept,
  maxFileSize = 52428800, // Default 50mb
  file,
  onChange,
  handleDelete,
  customRender,
  options = ['file'],
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploader, progress] = useGCSFileUploader();
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.size > maxFileSize) {
      alert(`File size must be less than ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }

    if (accept && accept.length > 0) {
      const isAccepted = accept.some(type => {
        if (type.includes('*')) {
          const baseType = type.split('/*')[0];
          return selectedFile.type.startsWith(baseType);
        }
        return selectedFile.type === type;
      });

      if (!isAccepted) {
        alert('File type not supported');
        return;
      }
    }

    try {
      const url = await uploader.mutateAsync({
        payload: { file: selectedFile }
      });

      // Simulate the expected response format
      const mockEvent = {
        target: {
          value: {
            url: url,
            file_name: selectedFile.name,
            mime_type: selectedFile.type,
            file_size: selectedFile.size
          }
        }
      };

      onChange?.(mockEvent);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isUploading = uploader.isLoading || progress !== null;

  // Handle customRender or image preview for logos
  if (customRender) {
    return (
      <div className={clsx('relative', className)}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept?.join(',')}
          onChange={handleInputChange}
          disabled={disabled || isUploading}
          className="hidden"
        />
        {file?.url ? (
          <div className="relative group">
            <Image 
              src={file.url} 
              alt="Uploaded" 
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-lg"
            />
            <div 
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
            >
              <HiUpload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete?.();
              }}
              disabled={disabled}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
            className="cursor-pointer"
          >
            {customRender}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={clsx('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept?.join(',')}
        onChange={handleInputChange}
        disabled={disabled || isUploading}
        className="hidden"
      />
      
      {file?.url ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="text-green-600 flex-shrink-0">
              <HiUpload className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">File uploaded</p>
              <p className="text-xs text-gray-500">
                {file.file_name ? file.file_name : 'View file'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              disabled={disabled}
              className="text-red-600 hover:text-red-800 disabled:opacity-50 flex-shrink-0"
            >
              <HiTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300',
            disabled || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400 hover:bg-blue-50'
          )}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              {/* Circular Progress Ring */}
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={226.19}
                    strokeDashoffset={226.19 - (226.19 * (progress || 0)) / 100}
                    className="text-blue-600 transition-all duration-300"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {progress !== null ? Math.round(progress) : 0}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">
                Uploading file...
              </p>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 transition-all duration-300 ease-out"
                  style={{ width: `${progress || 0}%` }}
                />
              </div>
            </div>
          ) : (
            placeholder || (
              <div className="flex flex-col items-center">
                <HiUpload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  Max size: {formatFileSize(maxFileSize)}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default GCSFileUploader;