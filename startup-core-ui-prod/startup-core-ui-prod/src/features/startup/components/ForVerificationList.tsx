import {
  Button,
  FitContent,
  Pagination,
  Table,
  TableColumn,
} from 'ui/components';
import useForVerificationList from '../hooks/useForVerificationList';
import StartUpFilter, { INIT_FILTER_STATE } from './StartUpFilter';
import { useState, useEffect } from 'react';
import { showVerificationModal } from '../modal/VerificationModal';
import { TReturnStartup } from '../startup';

function ForVerificationList() {
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  const [hideTestAccounts, setHideTestAccounts] = useState(true);
  const { isFetching, data } = useForVerificationList(filter);

  useEffect(() => {
    setFilter({
      ...INIT_FILTER_STATE,
      ...(hideTestAccounts && { is_test_account: '0' }),
    });
  }, [hideTestAccounts]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <StartUpFilter onChange={setFilter} />
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hideTestAccounts}
              onChange={(e) => setHideTestAccounts(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">Hide Test Accounts</span>
          </label>
        </div>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list ?? []}>
          <TableColumn id="name" label="Name" />
          <TableColumn id="founder_name" label="Founder" />
          <TableColumn id="business_classification" label="Classification" />
          <TableColumn
            id="action"
            label="Action"
            width="150px"
            render={(row: TReturnStartup) => (
              <div className="flex space-x-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    showVerificationModal(row);
                  }}
                >
                  Review
                </Button>
              </div>
            )}
          />
        </Table>
      </FitContent>
      <Pagination className="mt-4" onChange={setFilter} value={data?.pager} />
    </>
  );
}

export default ForVerificationList;
