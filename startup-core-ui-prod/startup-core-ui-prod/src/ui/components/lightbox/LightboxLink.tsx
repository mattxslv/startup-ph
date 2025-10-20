import { useMemo, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import LightBox from './LightBox';
import { ILightboxItem } from './types';

interface Props<T> {
  className?: string;
  items: T[];
  fileKey: string | ((x: T) => string);
  labelKey: string | ((x: T) => string);
  typeKey: string | ((x: T) => 'pdf' | 'image');
  children: React.ReactNode;
}

function LightboxLink<T>({
  className,
  items,
  fileKey,
  labelKey,
  typeKey,
  children,
}: Props<T>) {
  const [show, setShow] = useState(false);
  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShow(!show);
  };
  const data = useMemo<ILightboxItem[]>(
    () =>
      items.map((row: T) => ({
        // @ts-expect-error map object to get key
        url: typeof fileKey === 'function' ? fileKey(row) : row[fileKey],
        // @ts-expect-error map object to get key
        label: typeof labelKey === 'function' ? labelKey(row) : row[labelKey],
        // @ts-expect-error map object to get key
        type: typeof typeKey === 'function' ? typeKey(row) : row[typeKey],
      })),
    [items, fileKey, labelKey, typeKey]
  );
  return (
    <>
      <a className={className} href="#lightbox" onClick={handleToggle}>
        {children}
        <HiEye className="inline-block ml-1 mb-1" />
      </a>
      <LightBox
        show={show}
        data={data}
        onClose={() => {
          setShow(false);
        }}
      />
    </>
  );
}

LightboxLink.defaultProps = {
  className: 'underline',
};

export default LightboxLink;
