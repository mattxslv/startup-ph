import {
  Button,
  FitContent,
  Pagination,
  Table,
  TableColumn,
} from 'ui/components';
import useAuditLogsList from '../hooks/useAuditLogsList';
import { showAuditLogsModal } from '../modal/AuditLogsModal';
import { IAuditLogs } from '../types';
import { useState } from 'react';

interface Props {
  registrantId?: string | number | null;
}

function AuditLogsList({ registrantId }: Props) {
  const [filter, setFilter] = useState({ page: 1 });
  const { isFetching, data } = useAuditLogsList(filter);
  const handleDetails = (row: IAuditLogs) => () => {
    showAuditLogsModal(row);
  };
  return (
    <>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list || []}>
          <TableColumn id="created_at" label="Timestamp" />
          <TableColumn
            id="user_name"
            label="User"
            className={registrantId ? 'hidden' : ''}
          />
          <TableColumn id="event" label="Event" width="120px" />
          <TableColumn id="auditable_type" label="Module" width="140px" />
          <TableColumn
            id="action"
            label="Action"
            width="116px"
            render={(row: IAuditLogs) => (
              <>
                <Button size="sm" onClick={handleDetails(row)}>
                  Details
                </Button>
              </>
            )}
          />
        </Table>
      </FitContent>
      <Pagination className="mt-4" onChange={setFilter} value={data?.pager} />
    </>
  );
}

export default AuditLogsList;
