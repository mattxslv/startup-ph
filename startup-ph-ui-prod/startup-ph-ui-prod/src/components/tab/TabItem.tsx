import React from 'react'
import { useTab } from './context';
import clsx from 'clsx';

interface Props extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  id: string
  activeClassName?: string
}

function TabItem({ id, children, className, activeClassName, ...props }: Props) {
  const { tab, setTab } = useTab();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTab(id);
  }
  return (
    <a className={clsx('inline-block px-5 py-2 text-sm', className, tab === id ? 'text-primary font-bold' : 'text-[#AFAFAF] font-medium')} href={`#${id}`} {...props} onClick={handleClick}>
      {children}
    </a>
  )
}

export default TabItem