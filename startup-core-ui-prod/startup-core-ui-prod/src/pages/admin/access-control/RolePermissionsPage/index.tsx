import ACLFilter, {
  INIT_FILTER_STATE,
} from 'features/user-management/components/ACLFilter';
import RoleList from 'features/user-management/components/RoleList';
import useRoleList from 'features/role-permissions/hooks/useRoleList';
import { showRoleModal } from 'features/user-management/modal/RoleModal';
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Button, Pagination } from 'ui/components';
import { Acl } from 'features/profile';

function RolePermissionsPage() {
  const { id } = useParams();
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  const { isFetching, data } = useRoleList(filter);

  return (
    <div className="bg-white w-full h-full flex-1 flex divide-x divide-gray-100">
      <div className="flex flex-col">
        <ACLFilter onChange={setFilter} />

        <RoleList roles={data?.list} isFetching={isFetching} />

        <Acl code={['roles-manage']}>
          <Button
            variant="primary"
            className="m-4"
            onClick={() => showRoleModal({})}
          >
            Add Roles
          </Button>
        </Acl>

        <Pagination className="p-4 " value={data?.pager} />
      </div>

      {!id ? (
        <div className="m-auto flex items-center justify-center text-sm font-semibold text-gray-400">
          {isFetching ? 'Loading...' : 'No user selected, please select one.'}
        </div>
      ) : null}

      <Outlet />
    </div>
  );
}

export default RolePermissionsPage;
