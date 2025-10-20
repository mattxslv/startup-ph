import React from 'react';
import { Section } from './types';
import SectionItem from './SectionItem';
import Image from 'next/image';

type Props = {
  data: Array<Section>;
  message?: string;
};

function ViewCampaign({ data, message }: Props) {
  const defaultMsg = `It looks like you Haven't filled out your Portfolio yet. Click the button below to
            get started and complete your Startup information.`;
  return (
    <div className='w-full p-5'>
      {data.length < 1 ? (
        <div className='flex flex-col  items-center text-center text-sm '>
          <div>
            <Image width={80} height={80} src='/images/startup/empty-box.png' alt=''></Image>
          </div>
          <h1 className='max-w-xl text-gray-500'>{message ? message : defaultMsg}</h1>
        </div>
      ) : (
        React.Children.toArray(data.map((row, i) => <SectionItem data={row} />))
      )}
    </div>
  );
}

export default ViewCampaign;
