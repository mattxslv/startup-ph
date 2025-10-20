import Avatar from 'features/user-management/components/Avatar';
import PermissionList from 'features/user-management/components/PermissionList';
import usePermissionGroupList from 'features/user-management/hooks/usePermissionGroupList';
import useRoleById from 'features/role-permissions/hooks/useRoleById';
import useSyncPermissions from 'features/role-permissions/hooks/useSyncPermissions';
import { showRoleModal } from 'features/user-management/modal/RoleModal';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { Button, Toast } from 'ui/components';
import { Acl } from 'features/profile';

const RoleDetails = () => {
  const { id } = useParams();
  const { isFetching: isFetchingRole, data: details } = useRoleById(id ?? '');
  const [userRoles, setUserRoles] = useState<Array<number>>([]);
  const { isFetching: isFetchingPermissions, data: permissions } =
    usePermissionGroupList();
  const updator = useSyncPermissions();

  useEffect(() => {
    const userPermissionIds = details?.permissions.map((p) => Number(p.id));
    setUserRoles(userPermissionIds ?? []);
  }, [JSON.stringify(details)]);

  const isChecked = useCallback(
    (checkboxId: number | string): boolean | undefined => {
      return userRoles?.some((i) => i === checkboxId);
    },
    [JSON.stringify(userRoles)]
  );

  const handleEdit = () => {
    showRoleModal(details);
  };

  const onChangeUserPermissions = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    if (userRoles.includes(Number(value))) {
      setUserRoles((prev) => prev.filter((item) => item !== Number(value)));
    } else {
      setUserRoles((prev) => [...prev, Number(value)]);
    }
  };

  const onUpdateRole = () => {
    updator.mutate(
      {
        id: String(id),
        payload: userRoles,
      },
      {
        onSuccess: () => {},
        onError: (err: any) => {
          if (err?.errors) Toast.error(err.message);
        },
      }
    );
  };

  if (!details)
    return (
      <div className="m-auto flex items-center justify-center text-sm font-semibold text-gray-400">
        {isFetchingRole ? 'Loading...' : 'No details available'}
      </div>
    );

  return (
    <div className="p-4 flex flex-col flex-1 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Avatar name={details.name} className="w-20 h-20 text-xl" />

          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-lg">
              {details.name}{' '}
              <span className="text-xs text-green-500 bg-green-50 rounded-full py-1 px-3 inline-flex items-center justify-center">
                Active
              </span>
            </h1>
          </div>
        </div>

        <Acl code={['roles-manage']}>
          <Button
            onClick={handleEdit}
            type="button"
            leadingIcon={<HiPencilAlt />}
          >
            Edit
          </Button>
        </Acl>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-semibold">Access Control Roles</p>
          <small className="text-gray-500">Roles and Permissions</small>
        </div>

        <Acl code={['roles-manage']}>
          <Button variant="dark" onClick={onUpdateRole}>
            Update Roles
          </Button>
        </Acl>
      </div>

      <div className="border-b" />

      <Acl code={['roles-view']}>
        <PermissionList
          isFetching={isFetchingPermissions}
          permissions={permissions?.list}
          isChecked={isChecked}
          onChange={onChangeUserPermissions}
        />
      </Acl>
    </div>
  );
};

export default RoleDetails;
