import StartupInfo from '@/feature/home/components/StartupInfo';
import { TStartup } from '@/feature/startup/types';
import Badge from '@/ui/badge/Badge';
import { isEmpty } from 'lodash';
import React from 'react';

interface IProps {
  data: TStartup;
}

const StartupPage = ({ data }: IProps) => {
  return (
    <div className='py-4 md:mx-4 sm:px-6 px-4 space-y-4'>
      <StartupInfo
        data={data}
        isUnverified={false}
        isVerifiable={false}
        canEdit={false}
        sections={['basic', 'sector', 'contact', 'social']}
        hasBanner={false}
      />
      {/* <div className='flex items-center gap-5 mb-10'>
        <img src={data.logo_url || '/images/news/no-image.jpg'} className='w-20' alt={data.name} />

        <div className='flex flex-col gap-1'>
          <h2 className='font-bold text-xl'>{data.name}</h2>
          <div className='flex items-center gap-2'>
            <p className='text-sm'>Sectors: </p>
            {data.sectors
              ? data.sectors.map((sector) => <Badge key={sector}>{sector}</Badge>)
              : 'N/A'}
          </div>
        </div>
      </div>

      <p>
        <span className='text-muted'>Founder: </span>
        <span className='font-semibold'>{data.founder_name}</span>
      </p>
      <p>
        <span className='text-muted'>Founding Year: </span>
        <span className='font-semibold'>{data.founding_year}</span>
      </p>
      <p className='text-muted mt-5'>{data.description}</p> */}
    </div>
  );
};

export default StartupPage;
