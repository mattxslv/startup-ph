import clsx from 'clsx';
import Avatar from './Avatar';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { IRole } from 'features/role-permissions/types';

interface Props {
  roles?: IRole[];
  isFetching?: boolean;
}

function RoleList({ roles, isFetching }: Props) {
  return (
    <div className="flex flex-col flex-1 relative overflow-y-auto border-b border-fill-disabled">
      <div className="absolute w-full h-full left-0 top-0">
        {roles && roles.length ? (
          roles.map((item, i) => (
            <Fragment key={i}>
              {(item.name?.[0] || '').toLowerCase() !==
              (roles?.[i - 1]?.name?.[0] || '').toLowerCase() ? (
                <p className="py-1 px-4 bg-fill-disabled text-xs font-semibold">
                  {(item?.name?.[0] || '').toUpperCase()}
                </p>
              ) : null}

              <NavLink
                to={`/access-control/roles/${item.id}`}
                className={({ isActive }) =>
                  clsx(
                    'flex gap-2 px-4 py-2 items-center cursor-pointer hover:bg-gray-50',
                    isActive ? 'bg-gray-100' : ''
                  )
                }
                // onClick={() => onSelect(item)}
              >
                <Avatar name={item.name} className="w-10 h-10" />

                <p className="text-sm font-semibold">{item.name}</p>
              </NavLink>
            </Fragment>
          ))
        ) : (
          <p className="text-disabled text-xs text-center">
            {isFetching ? 'Searching...' : 'No role/s available.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default RoleList;
