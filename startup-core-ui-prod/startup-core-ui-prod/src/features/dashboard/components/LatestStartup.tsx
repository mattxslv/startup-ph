import useStartUpList from 'features/startup/hooks/useStartUpList';
import { Table, TableColumn } from 'ui/components';

const LatestStartup = () => {
  const { isFetching, data } = useStartUpList({
    order_by: 'created_at',
    status_by: 'desc',
    per_page: 10,
  });
  return (
    <>
      <p className="text-xs text-gray-400 font-semibold pt-2">
        LATEST STARTUPS
      </p>
      <div className="bg-white">
        <Table isLoading={isFetching} data={data?.list || []}>
          <TableColumn
            id="name"
            label="STARTUP NAME"
            width="140px"
            className="text-xs"
          />
          <TableColumn
            id="sectors"
            label="STARTUP SECTOR"
            width="140px"
            className="text-xs"
          />
          <TableColumn
            id="short_description"
            label="SHORT DESCRIPTION"
            className="text-xs"
          />
          <TableColumn
            id="verified_at"
            label="DATE VERIFIED"
            width="160px"
            className="text-xs"
            render={(row) =>
              row.verified_at ? new Date(row.verified_at).toDateString() : '-'
            }
          />
        </Table>
      </div>
    </>
  );
};

export default LatestStartup;
