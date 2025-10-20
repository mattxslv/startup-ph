import {
  Button,
  FitContent,
  Pagination,
  showAlert,
  Table,
  TableColumn,
} from 'ui/components';
import useRequirementsList from '../hooks/useRequirementsList';
import { useDeleteRequirement } from '../hooks/useRequirementMutate';
import { showRequirementModal } from '../modal/RequirementModal';
import { IRequirement } from '../types';
import RequirementFilter, { INIT_FILTER_STATE } from './RequirementFilter';
import { useState } from 'react';
import { Acl } from 'features/profile';

function RequirementsList() {
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  const { isFetching, data } = useRequirementsList(filter);
  const handleEdit = (row: IRequirement) => () => {
    showRequirementModal(row);
  };
  const deletor = useDeleteRequirement();
  const handleDelete = (row: IRequirement) => () => {
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
      <div className="flex justify-between items-center mb-4">
        <RequirementFilter onChange={setFilter} />
        <Acl code={['requirements-manage']}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => showRequirementModal({})}
          >
            Add Requirement
          </Button>
        </Acl>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list ?? []}>
          <TableColumn id="type" label="Type" width="80px" />
          <TableColumn
            id="name"
            label="Requirement"
            render={(row: IRequirement) => (
              <div className="text-sm">
                <div className="font-semibold">{row.name}</div>
                <div>{row.code}</div>
              </div>
            )}
          />

          <TableColumn
            id="action"
            label="Action"
            width="180px"
            render={(row: IRequirement) => (
              <Acl code={['requirements-manage']}>
                <div className="flex space-x-1">
                  <Button size="sm" onClick={handleEdit(row)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDelete(row)}
                  >
                    Delete
                  </Button>
                </div>
              </Acl>
            )}
          />
        </Table>
      </FitContent>
      <Pagination className="mt-4" onChange={setFilter} value={data?.pager} />
    </>
  );
}

export default RequirementsList;
