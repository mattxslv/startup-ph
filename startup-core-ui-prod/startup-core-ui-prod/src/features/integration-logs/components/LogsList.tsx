import {
  Badge,
  Button,
  FitContent,
  Img,
  Table,
  TableColumn,
} from 'ui/components';
import useLogsList from '../hooks/useLogsList';
import { showLogsModal } from '../modal/LogsModal';
import { ILogs } from '../types';
// import Pagination from 'ui/components/pagination/Pagination'
import { useState } from 'react';
import dayjs from 'dayjs';

function LogsList() {
  const [filter, setFilter] = useState({
    page: 1,
    date_from: dayjs('2023-01-01').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    date_to: dayjs().endOf('year').format('YYYY-MM-DD HH:mm:ss'),
  });
  const { isFetching, data } = useLogsList(filter);
  const handleDetails = (row: ILogs) => () => {
    showLogsModal(row);
  };
  return (
    <>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list || []}>
          <TableColumn id="created_at" label="Timestamp" />
          <TableColumn id="partner_name" label="Partner Name" />
          <TableColumn id="hit_name" label="Query Name" />
          <TableColumn
            id="with_hit"
            label="With Hit"
            render={(row: ILogs) =>
              row.with_hit ? (
                <Badge variant="danger">With Hit</Badge>
              ) : (
                <Badge variant="success">No Hit</Badge>
              )
            }
          />
          <TableColumn id="hit_count" label="Hit Count" />
          <TableColumn
            id="action"
            label="Action"
            width="116px"
            render={(row: ILogs) => (
              <>
                <Button size="sm" onClick={handleDetails(row)}>
                  Details
                </Button>
              </>
            )}
          />
        </Table>
      </FitContent>
      {/* <Pagination className="mt-4" onChange={setFilter} value={data?.pager} /> */}
    </>
  );
}

export default LogsList;
