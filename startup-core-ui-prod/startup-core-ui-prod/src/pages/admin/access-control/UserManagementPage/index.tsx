import { UserManagementList } from 'features/user-management';
import ACLFilter, {
  INIT_FILTER_STATE,
} from 'features/user-management/components/ACLFilter';
import useUserManagementList from 'features/user-management/hooks/useUserManagementList';
import { showUserManagementModal } from 'features/user-management/modal/UserManagementModal';
import { useState } from 'react';
import { Button, Pagination } from 'ui/components';
import { Outlet, useParams } from 'react-router-dom';
import { Acl } from 'features/profile';

function UserManagementPage() {
  const { id } = useParams();
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  const { isFetching, data } = useUserManagementList(filter);

  return (
    <div className="bg-white w-full h-full flex-1 flex divide-x divide-gray-100">
      <div className="flex flex-col">
        <ACLFilter onChange={setFilter} />

        <UserManagementList users={data?.list} isFetching={isFetching} />

        <Acl code="administrators-manage">
          <Button
            variant="primary"
            className="m-4"
            onClick={() => showUserManagementModal({})}
          >
            Add Users
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

export default UserManagementPage;
