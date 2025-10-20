import Link from 'next/link';
import { ReactNode } from 'react';

interface ILogoContainer {
  children: ReactNode;
  isUnverified: boolean;
}

const LogoContainer = ({ children, isUnverified }: ILogoContainer) => {
  if (isUnverified) return <Link href='/my-startup'>{children}</Link>;

  return <>{children}</>;
};

export default LogoContainer;
