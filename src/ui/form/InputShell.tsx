import clsx from 'clsx';
import React, { useMemo } from 'react';

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string | React.ReactNode;
  note?: string;
  optional?: boolean | React.ReactNode;
  error?: string[] | string | boolean | null;
  trailing?: React.ReactNode;
  reset?: boolean;
  handleReset?: () => void;
}

function InputShell({
  label,
  children,
  note,
  optional,
  error,
  trailing,
  reset,
  handleReset,
}: Props) {
  const renderNote = useMemo(() => {
    if (typeof error === 'string') return error;
    return note;
  }, [note, error]);
  return (
    <div className='pb-2 relative w-full '>
      <div className='flex justify-between'>
        {label ? (
          <div className='text-muted text-xs flex justify-between gap-5 w-full mb-1'>
            <div className='font-medium'>{label}</div>
            {optional === true ? <p className='mx-4'>Optional</p> : optional}
          </div>
        ) : null}
        {reset ? (
          <button
            type='button'
            className=' z-10 text-xs text-muted'
            onClick={handleReset ? () => handleReset() : () => {}}
          >
            clear
          </button>
        ) : null}
      </div>
      {children}
      {trailing ? <div className='absolute right-0 top-7 pr-4 z-10'>{trailing}</div> : null}
      {note ? (
        <div className={clsx('text-xs -translate-y-1 mt-2', error ? 'text-danger' : 'text-muted')}>
          {renderNote}
        </div>
      ) : null}
    </div>
  );
}

export default InputShell;
