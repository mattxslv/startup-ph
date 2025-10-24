import clsx from 'clsx';
import React from 'react';

interface Props {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  labelClassName?: string;
}

function Info({
  icon,
  label,
  children,
}: {
  icon?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex space-x-1 md:items-center flex-col sm:flex-row'>
      <div className='flex-shrink-0 flex items-center space-x-2'>
        {icon && <img className='h-5 w-5 object-center object-contain' src={icon} alt='Icon' />}
        <div className='text-sm text-description'>{label}:</div>
      </div>
      <div className='text-sm text-description font-semibold flex-1 min-w-0'>{children}</div>
    </div>
  );
}

function InfoColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-lg font-semibold'>{label}</div>
      <div className='text-base text-description max-w-full break-all overflow-hidden text-ellipsis'>
        {children}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, labelClassName = '' }: Props) {
  return (
    <div className='flex space-x-2 text-base'>
      {icon}
      <div className={clsx('flex-shrink-0 text-muted', labelClassName)}>{label}:</div>
      <div className='text-[#323232] font-semibold'>{value}</div>
    </div>
  );
}

function InfoItemVertical({ label, value, labelClassName = '' }: Props) {
  return (
    <div className='block'>
      <div className={clsx('text-sm text-muted mb-2', labelClassName)}>{label}:</div>
      <div className='text-[#323232] text-base font-semibold'>{value}</div>
    </div>
  );
}

export { InfoItem, InfoItemVertical, InfoColumn };

export default Info;
