import clsx from 'clsx';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

type Props = {
  children: (props: { props: any; onClose: () => void }) => React.ReactNode;
};

export type DrawerHandler = {
  show: (data?: any) => void;
};

const Drawer = forwardRef(({ children }: Props, ref) => {
  const [show, setShow] = useState(false);
  const [props, setData] = useState<any>(undefined);
  const onClose = useCallback(() => {
    setShow(false);
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      show: (newData: any) => {
        setShow(true);
        setData(newData);
      },
    }),
    []
  );
  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black/40 flex z-[45] w-full px-2 transition-all ease-in-out',
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <div
        className={clsx(
          'bg-white w-full h-full mt-auto max-w-xl mx-auto lg:my-auto rounded-t-2xl lg:rounded-2xl px-3 py-4 shadow transition-all ease-in-out relative overflow-y-auto',
          show ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {show ? children({ props, onClose }) : null}
      </div>
    </div>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
