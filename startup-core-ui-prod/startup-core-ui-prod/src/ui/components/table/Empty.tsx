import { isValidElement, ReactNode } from 'react';
import clsx from 'clsx';
import { FiRefreshCcw } from 'react-icons/fi';

interface Props {
  reload?: () => void;
  children?: ReactNode;
  className?: string;
  message?: string | ReactNode;
}

function Empty({
  reload,
  children,
  className = '',
  message = 'No data found.',
}: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-gray-100 p-4 h-48',
        className
      )}
    >
      {children ?? (
        <div className="flex flex-col gap-2 h-28 items-center justify-center bg-gray-50 px-12 rounded">
          <div className="text-gray-500 flex flex-col items-center gap-2">
            {isValidElement(message) ? (
              message
            ) : (
              <p className="text-xs">{message}</p>
            )}
            {reload ? (
              <button
                className="font-semibold flex items-center gap-2 underline hover:text-black/80 duration-500 hover:drop-shadow-lg"
                type="button"
                onClick={reload}
              >
                <FiRefreshCcw className="text-sm" />
                <span className="text-sm">Reload</span>
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Empty;
