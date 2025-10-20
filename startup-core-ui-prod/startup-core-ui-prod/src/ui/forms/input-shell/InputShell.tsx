import clsx from 'clsx';
import React, { useMemo } from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label?: string | React.ReactNode;
  note?: string;
  optional?: boolean | React.ReactNode;
  error?: string[] | string | boolean | null;
  trailing?: React.ReactNode;
}

function InputShell({
  label,
  children,
  note,
  optional,
  error,
  trailing,
}: Props) {
  const renderNote = useMemo(() => {
    if (typeof error === 'string') return error;
    return note;
  }, [note, error]);
  return (
    <div className="space-y-1.5 relative w-full">
      {label ? (
        <div className="text-description text-xs flex justify-between">
          <div className="font-semibold">{label}</div>
          {optional ? <div>Optional</div> : null}
        </div>
      ) : null}
      {children}
      {trailing ? (
        <div className="absolute right-0 top-6 pr-4 z-10">{trailing}</div>
      ) : null}
      {note ? (
        <div
          className={clsx(
            'text-xs',
            error ? 'text-danger-base' : 'text-description'
          )}
        >
          {renderNote}
        </div>
      ) : null}
    </div>
  );
}

export default InputShell;
