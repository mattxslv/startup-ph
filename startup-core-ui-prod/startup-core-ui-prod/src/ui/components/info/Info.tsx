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
  className,
}: {
  icon?: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'flex space-x-1 items-center flex-col sm:flex-row',
        className
      )}
    >
      <div className="flex-shrink-0 flex items-center space-x-2">
        {icon && (
          <img
            className="h-5 w-5 object-center object-contain"
            src={icon}
            alt="Icon"
          />
        )}
        <div className="text-xs text-description">{label}:</div>
      </div>
      <div className="text-xs text-description font-semibold flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}

function InfoColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-description max-w-full break-all overflow-hidden text-ellipsis">
        {children}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, labelClassName = '' }: Props) {
  return (
    <div className="flex space-x-2 text-sm">
      {icon}
      <div className={clsx('flex-shrink-0 text-muted', labelClassName)}>
        {label}:
      </div>
      <div className="text-[#323232] font-semibold">{value}</div>
    </div>
  );
}

function InfoItemVertical({ label, value, labelClassName = '' }: Props) {
  return (
    <div className="block">
      <div className={clsx('text-xs text-muted mb-2', labelClassName)}>
        {label}:
      </div>
      <div className="text-[#323232] text-sm font-semibold">{value}</div>
    </div>
  );
}

export { InfoItem, InfoItemVertical, InfoColumn };

export default Info;
