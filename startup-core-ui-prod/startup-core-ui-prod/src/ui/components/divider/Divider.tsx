import React from 'react';

interface Props {
  label: string;
  trailing?: React.ReactNode;
}

function Divider({ label, trailing }: Props) {
  return (
    <div className="flex items-center space-x-2.5">
      <div className="uppercase text-primary-base text-xs leading-4 font-bold min-w-0">
        {label}
      </div>
      <div className="border-b flex-1 min-w-0" />
      {trailing ? <div className="flex-shrink-0">{trailing}</div> : null}
    </div>
  );
}

export default Divider;
