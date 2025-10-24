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
    <div className='relative pt-[34%] md:pt-[28%] bg-gray-400'>
      <div className='absolute top-0 right-0 bg-black/20 rounded-bl-lg z-20'>
        <Button
          onClick={onToggleMenu}
          className='text-white'
          variant='link'
          leading={uploading ? <CgSpinner className='animate-spin' /> : <HiPencil />}
          size='xs'
        >
          {uploading 
            ? `- ${formatNumber(uploadProgress || 0, 1)}% -` 
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
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600'>
            <div className='text-center'>
              <HiPencil className='w-12 h-12 mx-auto mb-2 text-white/60' />
              <span className='text-xl font-light tracking-tight text-white/80'>
                Upload Banner
              </span>
            </div>
          </div>
        )}
      </button>
      <div className='absolute top-10 right-10 w-32'>{isShowMenu ? MenuComponent : null}</div>
    </div>
  );
};

export default CustomBannerUpload;
