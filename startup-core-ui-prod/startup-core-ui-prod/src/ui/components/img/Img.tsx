import clsx from 'clsx';
import { useState } from 'react';

interface IImgProps {
  src?: string | null;
  alt: string | (() => string);
  className?: string;
  imgClassName?: string;
  altClassName?: string;
}

function shorten(str?: string) {
  const arr = (str ?? '').replace(/[^a-zA-Z ]/g, '').split(' ');
  if (arr.length < 2) return (str ?? '').substring(0, 2);
  return `${(arr[0] ?? '').substring(0, 1)}${(
    arr[arr.length - 1] ?? ''
  ).substring(0, 1)}`;
}

function Img({ className, imgClassName, altClassName, src, alt }: IImgProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const altValue =
    typeof alt === 'function' ? alt() : shorten(alt).toUpperCase();
  return (
    <div
      className={clsx(
        className,
        'bg-fill-disabled relative isolate text-xs font-medium'
      )}
    >
      <img
        key={src}
        className={clsx(
          imgClassName,
          'h-full w-full absolute inset-0 z-10',
          !imgLoaded || imgError ? 'opacity-0' : 'opacity-1'
        )}
        src={src ?? ''}
        alt={altValue}
        onLoad={() => {
          setImgLoaded(true);
          setImgError(false);
        }}
        onError={() => {
          setImgLoaded(false);
          setImgError(true);
        }}
      />
      <div
        className={clsx(
          'absolute inset-0 flex justify-center items-center',
          altClassName
        )}
      >
        {altValue}
      </div>
    </div>
  );
}

export default Img;
