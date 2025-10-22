import Image from 'next/image';
import React from 'react';

type Props = {};

function DevelopedBy({}: Props) {
  return (
    <div className='flex justify-between p-6 max-w-md mx-auto'>
      <div className='text-sm mb-2 flex flex-col items-center'>
        <div className='mb-2 text-sm'>Developed by:</div>
        <div className='flex justify-center'>
          <Image
            className='object-center object-contain'
            height={100}
            width={120}
            src='/images/make-colored.png'
            alt=''
          />
        </div>
      </div>
      <div className='text-sm mb-2 flex flex-col items-center'>
        <div className='mb-2'>In partnership with:</div>
        <div className='flex justify-start items-center space-x-4'>
          <Image
            className='object-center object-contain'
            height={30}
            width={40}
            src='/images/misc/dost.png'
            alt=''
          />
          <Image
            className='object-center object-contain'
            height={40}
            width={50}
            src='/images/misc/dti.png'
            alt=''
          />
        </div>
      </div>
    </div>
  );
}

export default DevelopedBy;
