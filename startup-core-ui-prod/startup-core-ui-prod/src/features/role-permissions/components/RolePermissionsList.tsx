import { useState } from 'react';
import {
  Badge,
  Button,
  FitContent,
  showAlert,
  Table,
  TableColumn,
} from 'ui/components';
import { useDeleteRole } from '../hooks/useRoleMutate';
import { showRoleModal } from '../modal/RoleModal';
import { IRole } from '../types';
import useRoleList from '../hooks/useRoleList';
// import AccessControlFilter, { INIT_STATE } from './AccessControlFilter'

function PermissionsList() {
  const [filter] = useState({});
  // const [filter, setFilter] = useState(INIT_STATE)
  const { isLoading, data, isError, refetch } = useRoleList(filter);
  const handleEdit = (row: IRole) => () => {
    showRoleModal(row);
  };

  const deletor = useDeleteRole();
  const handleDelete = (row: IRole) => () => {
    showAlert({
      message: 'Are you sure you want to delete?',
      onYes: (closeAlert) => {
        deletor.mutate(
          { id: `${row.id}` },
          {
            onSuccess: () => {
              closeAlert();
            },
          }
        );
      },
      yesLabel: 'Delete',
      variant: 'danger',
    });
  };
  return (
    <>
      <div className="flex items-center mb-4">
        {/* <div className="w-full max-w-md">
          <AccessControlFilter onChange={setFilter} />
        </div> */}
        <div className="ml-auto">
          <Button size="sm" variant="primary" onClick={() => showRoleModal({})}>
            Add Role
          </Button>
        </div>
      </div>
      <FitContent>
        <Table
          data={data?.list ?? []}
          emptyMessage={isError ? 'No data found' : undefined}
          isLoading={isLoading}
          refetch={() => {
            refetch();
          }}
        >
          <TableColumn id="name" label="Role" className="whitespace-nowrap" />
          <TableColumn
            id="permissions"
            label="Permissions"
            render={(row: IRole) => (
              <div className="-mb-1">
                {row.permissions.map((perm, i) => (
                  <Badge className="ml-1 mb-1" key={i}>
                    {perm.name}
                  </Badge>
                ))}
              </div>
            )}
          />
          <TableColumn
            id="action"
            label="Action"
            width="180px"
            render={(row: IRole) => (
              <div className="flex space-x-1">
                <Button size="sm" onClick={handleEdit(row)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={handleDelete(row)}>
                  Delete
                </Button>
              </div>
            )}
          />
        </Table>
      </FitContent>
    </>
  );
}

export default PermissionsList;
