import clsx from 'clsx';
import React, { ReactNode } from 'react';

const HomeSectionContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'relative bg-white rounded-lg py-4 md:mx-4 sm:px-6 px-4 space-y-4 z-20',
        className
      )}
    >
      {children}
    </div>
  );
};

export default HomeSectionContainer;
