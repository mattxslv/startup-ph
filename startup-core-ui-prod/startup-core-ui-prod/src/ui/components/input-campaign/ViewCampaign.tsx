import React from 'react';
import { Section } from './types';
import SectionItem from './SectionItem';

type Props = {
  data: Array<Section>;
};

function ViewCampaign({ data }: Props) {
  return (
    <div className="w-full">
      {data.length < 1 ? (
        <div className="text-center text-sm py-4">- No Startup Details -</div>
      ) : (
        React.Children.toArray(data.map((row, i) => <SectionItem data={row} />))
      )}
    </div>
  );
}

export default ViewCampaign;
