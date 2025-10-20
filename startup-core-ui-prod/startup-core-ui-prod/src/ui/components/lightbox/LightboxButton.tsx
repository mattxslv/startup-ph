import { useMemo, useState } from 'react';
import Button, { IButtonProps } from '../button/Button';
import LightBox from './LightBox';
import { ILightboxItem } from './types';

interface Props<T> extends IButtonProps {
  items: T[];
  fileKey: string | ((x: T) => string);
  labelKey: string | ((x: T) => string);
  typeKey: string | ((x: T) => string);
  children: React.ReactNode;
}

function LightboxButton<T>({
  items,
  fileKey,
  labelKey,
  typeKey,
  children,
  ...props
}: Props<T>) {
  const [show, setShow] = useState(false);
  const handleToggle = () => {
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
      <Button {...props} onClick={handleToggle}>
        {children}
      </Button>
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

export default LightboxButton;
