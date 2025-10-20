import React from 'react';
import { HiClipboard } from 'react-icons/hi';
import { Toast } from 'ui/components';

type Props = {
  label: string;
  value: string;
};

function CopyToClipboard({ label, value }: Props) {
  return (
    <a
      className="flex space-x-1 text-primary-base font-mono items-center hover:underline cursor:pointer"
      href="#copy-to-clipboard"
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard
          .writeText(value)
          .then(() => {
            Toast.success('Copied to clipboard!');
          })
          .catch((error) => {
            Toast.error('Unable to copy!');
          });
      }}
    >
      <HiClipboard className="flex-shrink-0 inline-block" />
      <span className="flex-1 min-w-0 truncate">{label}</span>
    </a>
  );
}

export default CopyToClipboard;
