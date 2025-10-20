import clsx from 'clsx';
import { forwardRef, useContext, useImperativeHandle, useMemo } from 'react';
import usePersistState, { storage } from 'hooks/usePersistState';
import { TabContext } from './context';
import Button from '../button/Button';

export const clearTabs = () => {
  const keys = storage.list().filter((x) => x.substring(0, 4) === 'tab-');
  keys.forEach((key) => {
    storage.remove(key);
  });
};

export const TabProvider = forwardRef(
  (
    {
      id,
      children,
      defaultTab,
    }: { id: string; defaultTab: string; children: React.ReactNode },
    ref
  ) => {
    const [tab, setTab] = usePersistState(`tab-${id}`, defaultTab);
    const value = useMemo(() => ({ tab, setTab }), [tab, setTab]);
    useImperativeHandle(
      ref,
      () => ({
        setTab,
      }),
      []
    );
    return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
  }
);

export const TabNav = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex flex-wrap">{children}</ul>;
};

export const TabItem = ({
  id,
  label,
  // leadingIcon, // WIP
  trailingIcon,
  disabled,
}: {
  id: string;
  label: string;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
}) => {
  const { tab, setTab } = useContext(TabContext)!;
  const isActive = tab === id;
  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (disabled) return;
    setTab(id);
  };
  return (
    <li>
      <a
        className={clsx(
          'block font-semibold text-sm leading-5 cursor-pointer px-2 pb-2.5 pt-0.5 relative',
          isActive ? 'text-primary-base' : '',
          disabled ? 'opacity-30 pointer-events-none' : '',
          'hover:text-description'
        )}
        onClick={handleSelect}
        href={`#${id}`}
      >
        <div className="flex items-center space-x-1">
          <span>{label}</span>
          {trailingIcon}
        </div>
        {isActive ? (
          <div className="absolute w-full bottom-0 left-0 h-0.5 bg-primary-base"></div>
        ) : null}
      </a>
    </li>
  );
};

export const TabButton = ({
  className,
  id,
  label,
}: {
  className?: string;
  id: string;
  label: string;
}) => {
  const { tab, setTab } = useContext(TabContext)!;
  const isActive = tab === id;
  const handleSelect = () => {
    setTab(id);
  };
  return (
    <Button
      className={clsx('rounded-none first:rounded-l last:rounded-r', className)}
      variant={isActive ? 'primary' : 'outlinePrimary'}
      size="sm"
      onClick={handleSelect}
    >
      {label}
    </Button>
  );
};

export const TabPanel = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode | ((tab: string) => React.ReactNode);
}) => {
  const { tab } = useContext(TabContext)!;
  if (tab !== id) return null;
  return <>{typeof children === 'function' ? children(tab) : children}</>;
};
