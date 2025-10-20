import {
  Badge,
  Button,
  FitContent,
  showAlert,
  Table,
  TableColumn,
} from 'ui/components';
import useIntegrationList from '../hooks/useIntegrationList';
import { useDeleteIntegration } from '../hooks/useIntegrationMutate';
import { showIntegrationModal } from '../modal/IntegrationModal';
import { IIntegration } from '../types';
import CopyToClipboard from 'components/copy-to-clipboard/CopyToClipboard';
import { InlineToggle } from 'ui/forms';
import {
  useRevokeIntegration,
  useUnrevokeIntegration,
} from '../hooks/useIntegrationToggle';

function ToggleRevoke({ data }: { data: IIntegration }) {
  const revoker = useRevokeIntegration();
  const unrevoke = useUnrevokeIntegration();
  return (
    <div>
      <InlineToggle
        onChange={(x) => {
          if (!x) revoker.mutate({ id: String(data.id) });
          if (x) unrevoke.mutate({ id: String(data.id) });
        }}
        value={!data.is_revoked}
      />
    </div>
  );
}

function IntegrationList() {
  const { isFetching, data } = useIntegrationList();
  const handleEdit = (row: IIntegration) => () => {
    showIntegrationModal(row);
  };
  const deletor = useDeleteIntegration();
  const handleDelete = (row: IIntegration) => () => {
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
          onClick={() => showIntegrationModal({})}
        >
          Add Integration
        </Button>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list ?? []}>
          <TableColumn
            id="name"
            label=""
            width="80px"
            render={(row: IIntegration) => <ToggleRevoke data={row} />}
          />
          <TableColumn id="name" label="Partner Name" />
          <TableColumn
            id="api_key"
            label="API Key"
            render={(row: IIntegration) =>
              row.api_key ? (
                <CopyToClipboard label={row.api_key} value={row.api_key} />
              ) : (
                <span>n/a</span>
              )
            }
          />
          <TableColumn
            id="is_revoked"
            label="Status"
            render={(row: IIntegration) =>
              row.is_revoked ? (
                <Badge variant="danger">
                  <span className="inline-block text-center w-16">Revoked</span>
                </Badge>
              ) : (
                <Badge variant="success">
                  <span className="inline-block text-center w-16">Active</span>
                </Badge>
              )
            }
          />
          <TableColumn
            id="action"
            label="Action"
            width="180px"
            render={(row: IIntegration) => (
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

export default IntegrationList;
