import {
  Button,
  FitContent,
  Pagination,
  showAlert,
  Table,
  TableColumn,
} from 'ui/components';
import useDatasetList from '../hooks/useDatasetList';
import { useDeleteDataset } from '../hooks/useDatasetMutate';
import { showDatasetModal } from '../modal/DatasetModal';
import { IDataset } from '../types';
import DatasetFilter, { INIT_FILTER_STATE } from './DatasetFilter';
import { useState } from 'react';
import { Acl } from 'features/profile';

interface Props {
  code: string;
  label: string;
}

function DatasetList({ code, label }: Props) {
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  const { isFetching, data } = useDatasetList(code, filter);
  const handleEdit = (row: IDataset) => () => {
    showDatasetModal(code, row);
  };
  const deletor = useDeleteDataset(code);
  const handleDelete = (row: IDataset) => () => {
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
        <DatasetFilter onChange={setFilter} />
        <Acl code={['datasets-manage']}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => showDatasetModal(code, {})}
          >
            Add {label}
          </Button>
        </Acl>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list ?? []}>
          <TableColumn
            id="name"
            label="Name"
            render={(row: IDataset) => (
              <div className="text-sm">
                <div className="font-semibold">{row.label}</div>
                <div>{row.description}</div>
              </div>
            )}
          />
          <TableColumn
            id="action"
            label="Action"
            width="180px"
            render={(row: IDataset) => (
              <Acl code={['datasets-manage']}>
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

export default DatasetList;
