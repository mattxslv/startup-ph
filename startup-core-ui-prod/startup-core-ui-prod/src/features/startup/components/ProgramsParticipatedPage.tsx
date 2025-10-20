import { Badge, Button, Table, TableColumn } from 'ui/components';
import useStartupApplications from '../hooks/useStartupApplications';
import { showProgramModal } from './ViewProgramModal';

interface Props {
  startupId: string;
}

const ProgramsParticipatedPage = ({ startupId }: Props) => {
  const { data, isLoading } = useStartupApplications(startupId);
  return (
    <div className="max-w-full overflow-auto">
      <Table isLoading={isLoading} data={data?.list || []}>
        <TableColumn
          id="program_name"
          label="Program Name"
          className="text-xs"
        />
        <TableColumn
          id="description"
          label="Short Description"
          className="text-xs"
        />
        <TableColumn
          id="date"
          label="Date Applied"
          className="text-xs"
          render={(row) =>
            row.date_start ? new Date(row.submitted_at).toDateString() : '-'
          }
        />
        <TableColumn id="agency" label="Agency" className="text-xs" />
        <TableColumn
          id="status"
          label="Status"
          render={(row) => (
            <Badge
              variant={row.status === 'FOR ASSESSMENT' ? 'info' : 'success'}
            >
              <small>{row.status}</small>
            </Badge>
          )}
        />
        <TableColumn
          id="view_details"
          label=""
          className="text-xs"
          render={(row) => (
            <Button onClick={() => showProgramModal(row)}>View</Button>
          )}
        />
      </Table>
    </div>
  );
};

export default ProgramsParticipatedPage;
