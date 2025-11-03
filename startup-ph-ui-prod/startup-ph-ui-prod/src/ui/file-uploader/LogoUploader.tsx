import React, { useState, useRef } from 'react';
import { HiUpload, HiPhotograph } from 'react-icons/hi';
import Image from 'next/image';
import ImageCropModal from './ImageCropModal';
import useGCSFileUploader from '@/hooks/useGCSFileUploader';

interface LogoUploaderProps {
  value?: string | null;
  onChange: (url: string) => void;
  onDelete?: () => void;
  disabled?: boolean;
  maxFileSize?: number;
  className?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  value,
  onChange,
  onDelete,
  disabled = false,
  maxFileSize = 52428800, // 50MB
  className = '',
}) => {
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploader, progress] = useGCSFileUploader();

  const isUploading = uploader.isLoading || progress !== null;

  const handleFileSelect = async (file: File) => {
    if (file.size > maxFileSize) {
      alert(`File size must be less than ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PNG and JPG images are allowed');
      return;
    }

    try {
      const url = await uploader.mutateAsync({
        payload: { file }
      });
      
      setTempImageUrl(url);
      setShowCropModal(true);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input value to allow uploading the same file again
    e.target.value = '';
  };

  const handleSaveCrop = (croppedUrl: string) => {
    onChange(croppedUrl);
    setShowCropModal(false);
    setTempImageUrl(null);
  };

  const handleReplace = () => {
    setShowCropModal(false);
    setTempImageUrl(null);
    fileInputRef.current?.click();
  };

  const handleViewClick = () => {
    if (value) {
      setTempImageUrl(value);
      setShowCropModal(true);
    }
  };

  return (
    <>
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleInputChange}
          disabled={disabled || isUploading}
          className="hidden"
        />

        {/* Circular Logo Preview */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
            {value ? (
              <Image
                src={value}
                alt="Logo"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <HiPhotograph className="w-12 h-12 text-gray-400" />
            )}
          </div>

          {/* Upload Overlay on Hover */}
          {!disabled && !isUploading && (
            <div
              className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <HiUpload className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Uploading Progress */}
          {isUploading && (
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-70 flex flex-col items-center justify-center">
              {/* Circular Progress Ring */}
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-white/20"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={226.19}
                    strokeDashoffset={226.19 - (226.19 * (progress || 0)) / 100}
                    className="text-white transition-all duration-300"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {progress !== null ? Math.round(progress) : 0}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <button
                type="button"
                onClick={handleViewClick}
                disabled={disabled || isUploading}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                View / Edit
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isUploading}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                Replace
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50 transition-colors"
            >
              <HiUpload className="w-4 h-4" />
              Select Logo
            </button>
          )}
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && tempImageUrl && (
        <ImageCropModal
          imageUrl={tempImageUrl}
          onClose={() => {
            setShowCropModal(false);
            setTempImageUrl(null);
          }}
          onSave={handleSaveCrop}
          onReplace={handleReplace}
          isCircle={true}
        />
      )}
    </>
  );
};

export default LogoUploader;
