import Button from '@/ui/button/Button';
import Toast from '@/ui/toast/Toast';
import formatNumber from '@/utils/formatNumber';
import { useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { HiPencil } from 'react-icons/hi';
import Image from 'next/image';

const CustomBannerUpload = (props: any) => {
  const { banner_url, onToggleMenu, MenuComponent, isShowMenu, progressPercentage, error, isUploading, progress } = props;
  
  // Use the passed progress or the old progressPercentage
  const uploadProgress = progress !== null ? progress : progressPercentage;
  const uploading = isUploading || progressPercentage;
  
  useEffect(() => {
    if (!error) return;
    Toast.error(error);
  }, [error]);
  
  // Updated banner placeholder design
  return (
    <div className='relative pt-[34%] md:pt-[28%] bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden'>
      {/* Decorative background patterns when no banner */}
      {!banner_url && (
        <>
          <div className='absolute inset-0 opacity-10'>
            <div className='absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2'></div>
          </div>
          <div className='absolute inset-0 opacity-5'>
            <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                  <path d='M 40 0 L 0 0 0 40' fill='none' stroke='white' strokeWidth='1'/>
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#grid)' />
            </svg>
          </div>
        </>
      )}
      
      {/* Upload Progress Overlay */}
      {uploading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
          <div className="flex flex-col items-center gap-4">
            {/* Circular Progress Ring */}
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-white/20"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={276.46}
                  strokeDashoffset={276.46 - (276.46 * (uploadProgress || 0)) / 100}
                  className="text-white transition-all duration-300"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {formatNumber(uploadProgress || 0, 0)}%
                </span>
              </div>
            </div>
            <p className="text-white text-lg font-medium">Uploading banner...</p>
            <div className="w-64 bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-2 transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress || 0}%` }}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className='absolute top-0 right-0 bg-black/20 rounded-bl-lg z-20'>
        <Button
          onClick={onToggleMenu}
          className='text-white'
          variant='link'
          leading={uploading ? <CgSpinner className='animate-spin' /> : <HiPencil />}
          size='xs'
        >
          {uploading 
            ? '' 
            : banner_url 
              ? '' 
              : 'Upload Banner'}
        </Button>
      </div>
      <button
        type='button'
        onClick={onToggleMenu}
        className='absolute inset-0 w-full flex md:pb-[115px] cursor-pointer'
      >
        {banner_url ? (
          <div>
            <Image
              className='object-center object-cover inset-0 absolute h-full w-full'
              fill
              src={banner_url}
              sizes='1200px'
              alt='Banner'
            />
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center relative z-10'>
            <div className='text-center space-y-3'>
              <div className='inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl'>
                <HiPencil className='w-10 h-10 text-white' />
              </div>
              <div>
                <div className='text-2xl font-semibold text-white mb-1'>
                  Add Your Banner
                </div>
                <p className='text-sm text-white/80'>
                  Click to upload a banner image (max. 50mb)
                </p>
              </div>
            </div>
          </div>
        )}
      </button>
      <div className='absolute top-10 right-10 w-32'>{isShowMenu ? MenuComponent : null}</div>
    </div>
  );
};

export default CustomBannerUpload;
