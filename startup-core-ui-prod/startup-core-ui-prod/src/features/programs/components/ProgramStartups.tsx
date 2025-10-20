import React, { useState } from 'react';
import {
  Badge,
  Button,
  FitContent,
  Pagination,
  Table,
  TableColumn,
} from 'ui/components';
import useProgramApplications from '../hooks/useProgramApplications';
import { showStartupReviewModal } from '../modal/StartupReviewModal';
import ApplicationStatusBadge from './ApplicationStatusBadge';

type Props = {
  programId: string;
};

function ProgramApplications({ programId }: Props) {
  const [filter, setFilter] = useState({ page: 1 });
  const { isFetching, data } = useProgramApplications(programId, filter);
  const list = data?.list || [];
  const handleDetails = (row: (typeof list)[number]) => () => {
    showStartupReviewModal(row);
  };
  return (
    <>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list || []}>
          <TableColumn id="submitted_at" label="Submitted At" />
          <TableColumn id="startup_name" label="Start Up" />
          <TableColumn
            id="status"
            label="Status"
            render={(row: (typeof list)[number]) => {
              return <ApplicationStatusBadge value={row.status} />;
            }}
          />
          <TableColumn
            id="action"
            label="Action"
            width="116px"
            render={(row: (typeof list)[number]) => (
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

export default ProgramApplications;
