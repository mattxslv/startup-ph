import {
  Button,
  FitContent,
  showAlert,
  Table,
  TableColumn,
} from 'ui/components';
import useOverrideList from '../hooks/useOverrideList';
import { useDeleteOverride } from '../hooks/useOverrideMutate';
import { showOverrideModal } from '../modal/OverrideModal';
import { IOverride } from '../types';

function OverrideList() {
  const { isFetching, data } = useOverrideList();
  const handleEdit = (row: IOverride) => () => {
    showOverrideModal(row);
  };
  const deletor = useDeleteOverride();
  const handleDelete = (row: IOverride) => () => {
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
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          variant="primary"
          onClick={() => showOverrideModal({})}
        >
          Add Override Code
        </Button>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list ?? []}>
          <TableColumn id="name" label="Name" />
          <TableColumn id="_masked_code" label="Code" />
          <TableColumn
            id="action"
            label="Action"
            width="180px"
            render={(row: IOverride) => (
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

export default OverrideList;
