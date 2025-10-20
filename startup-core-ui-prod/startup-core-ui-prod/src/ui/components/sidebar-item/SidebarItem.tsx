import clsx from 'clsx';
import { useAdminShell } from 'context/admin-shell';
import { useCallback } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

interface IProps extends NavLinkProps {
  to: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?:
    | React.ReactNode
    | (({ isActive }: { isActive: boolean }) => React.ReactNode);
  acl?: boolean;
}

function SidebarItem({
  children,
  to,
  leadingIcon,
  trailingIcon,
  acl = true,
  ...rest
}: IProps) {
  const { setShowSidebar } = useAdminShell();
  const pathname = useLocation().pathname;
  const isRootActive = pathname.includes(to);

  const trail = useCallback(
    (isActive: boolean) => {
      if (typeof trailingIcon === 'function') {
        return (
          <div className={clsx('ml-auto', isActive ? 'text-primary-base' : '')}>
            {trailingIcon({ isActive })}
          </div>
        );
      }
      return trailingIcon ? (
        <div className={clsx('ml-auto', isActive ? 'text-primary-base' : '')}>
          <>{trailingIcon}</>
        </div>
      ) : null;
    },
    [trailingIcon]
  );
  if (!acl) return null;
  return (
    <NavLink
      className="relative"
      to={to}
      {...rest}
      onClick={() => {
        if (!rest?.end) setShowSidebar(false);
      }}
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <div className="absolute w-1 rounded-r bg-primary-base h-[32px] left-0 top-0.5" />
          ) : null}
          <div
            className={clsx(
              'h-9 pl-6 pr-4 flex items-center rounded',
              isActive ? 'bg-primary-light' : ''
            )}
          >
            {leadingIcon ? (
              <div
                className={clsx(
                  'mr-2',
                  isActive || isRootActive ? 'text-primary-base' : ''
                )}
              >
                {leadingIcon}
              </div>
            ) : null}
            <div
              className={clsx(
                'text-sm font-semibold leading-4 truncate',
                isActive ? 'text-primary-base' : ''
              )}
            >
              <>{children}</>
            </div>
            {trail(isActive || isRootActive)}
          </div>
        </>
      )}
    </NavLink>
  );
}

export default SidebarItem;
