import React from 'react';
import useAcl from '../hooks/useAcl';

type Props = {
  code: string | string[];
  children: React.ReactNode;
  replace?: React.ReactNode;
};

function Acl({ code, children, replace }: Props): any {
  const { acl } = useAcl();
  if (acl(code)) return children;
  return replace || <></>;
}

export default Acl;
