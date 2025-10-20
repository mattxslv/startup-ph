import clsx from 'clsx';
import { IUser } from '../types';
import Avatar from './Avatar';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  users?: IUser[];
  isFetching?: boolean;
}

function UserManagementList({ users, isFetching }: Props) {
  return (
    <div className="flex flex-col flex-1 relative overflow-y-auto border-b border-fill-disabled">
      <div className="absolute w-full h-full left-0 top-0">
        {users && users.length ? (
          users.map((item, i) => (
            <Fragment key={i}>
              {(item.first_name?.[0] || '').toLowerCase() !==
              (users?.[i - 1]?.first_name?.[0] || '').toLowerCase() ? (
                <p className="py-1 px-4 bg-fill-disabled text-xs font-semibold">
                  {(item?.first_name?.[0] || '').toUpperCase()}
                </p>
              ) : null}

              <NavLink
                to={`/access-control/users/${item.id}`}
                className={({ isActive }) =>
                  clsx(
                    'flex gap-2 px-4 py-2 items-center cursor-pointer hover:bg-gray-50',
                    isActive ? 'bg-gray-100' : ''
                  )
                }
                // onClick={() => onSelect(item)}
              >
                <Avatar name={item.first_name} className="w-10 h-10" />

                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{item.display_name}</p>
                  <small className="text-xs">{item.email}</small>
                </div>
              </NavLink>
            </Fragment>
          ))
        ) : (
          <p className="text-disabled text-xs text-center">
            {isFetching ? 'Searching...' : 'No user/s available.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserManagementList;
