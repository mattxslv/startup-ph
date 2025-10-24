import React from 'react';

type Props = {
  label: string;
};

function Title({ label }: Props) {
  return <div className='font-semibold text-dark leading-[30px] text-2xl'>{label}</div>;
}

export default Title;
