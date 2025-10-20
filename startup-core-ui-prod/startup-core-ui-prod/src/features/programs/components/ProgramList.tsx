import {
  Button,
  FitContent,
  showAlert,
  Table,
  TableColumn,
} from 'ui/components';
import useProgramList from '../hooks/useProgramList';
import { useDeleteProgram } from '../hooks/useProgramMutate';
import { showProgramModal } from '../modal/ProgramModal';
import { IProgram } from '../types';

function ProgramList() {
  const { isFetching, data } = useProgramList();
  const handleEdit = (row: IProgram) => () => {
    showProgramModal(row);
  };
  const deletor = useDeleteProgram();
  const handleDelete = (row: IProgram) => () => {
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
          onClick={() => showProgramModal({})}
        >
          Add Program
        </Button>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list ?? []}>
          <TableColumn id="name" label="Client" />
          <TableColumn
            id="action"
            label="Action"
            width="180px"
            render={(row: IProgram) => (
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

export default ProgramList;
