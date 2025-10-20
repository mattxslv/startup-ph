import { Acl } from 'features/profile';
import { IRole } from 'features/role-permissions/types';
import { SyntheticEvent } from 'react';

interface Props {
  permissions?: IRole[];
  isFetching?: boolean;
  isChecked: (checkboxId: number | string) => boolean | undefined;
  onChange: (e: SyntheticEvent) => void;
}

const PermissionList = ({
  permissions,
  isFetching,
  isChecked,
  onChange,
}: Props) => {
  return (
    <div className="relative h-full w-full overflow-y-auto">
      <table className="table-auto border rounded-md text-sm absolute top-0 left-0 w-full">
        <tbody className="divide-y">
          {permissions && permissions.length > 0 ? (
            permissions.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4">
                  <p className="font-semibold capitalize">
                    {item.name.replace(/-/g, ' ')}
                  </p>
                  <small className="text-gray-500">{item.menu}</small>
                </td>
                {item.permissions.map((p) => (
                  <Acl code={['roles-manage']}>
                    <td className="py-3 px-4" key={p.id}>
                      <label
                        htmlFor={p.name}
                        className="flex gap-2 items-center"
                      >
                        <input
                          className="form-checkbox rounded"
                          type="checkbox"
                          id={p.name}
                          value={p.id}
                          checked={isChecked(p.id)}
                          onChange={onChange}
                        />
                        {p.name.replace(`${item.name}-`, '')}
                      </label>
                    </td>
                  </Acl>
                ))}
              </tr>
            ))
          ) : (
            <tr className="h-full w-full flex items-center justify-center text-gray-400">
              <td>{isFetching ? 'Loading...' : 'No Permissions Found'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionList;
