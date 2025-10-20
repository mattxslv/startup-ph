import {
  Button,
  FitContent,
  Table,
  TableColumn,
  showAlert,
} from 'ui/components';
import useInvestorList from '../hooks/useInvestorList';
import { showInvestorDetailsModal } from '../modal/InvestorDetailsModal';
import { IInvestor, TInvestorStatus } from '../types';
import Pagination from 'ui/components/pagination/Pagination';
import { useState } from 'react';
import InvestorFilter, { IFilter, INIT_FILTER_STATE } from './InvestorFilter';
import removeEmptyValues from 'utils/removeEmptyValues';
import InvestorStatusBadge from './InvestorStatusBadge';
import { useNavigate } from 'react-router-dom';

interface IProps {
  status?: TInvestorStatus;
}

function InvestorList({ status }: IProps) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<IFilter>(
    Object.assign(INIT_FILTER_STATE, removeEmptyValues({ status }))
  );
  const { isFetching, data } = useInvestorList(filter);
  const handleView = (row: IInvestor) => () => {
    navigate(`/investors/${row.id}`);
    // showInvestorDetailsModal(row)
  };
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex-1 max-w-sm">
          <InvestorFilter isLoading={isFetching} onChange={setFilter} />
        </div>
      </div>
      <FitContent>
        <Table isLoading={isFetching} data={data?.list || []}>
          <TableColumn id="name" label="Name" />
          <TableColumn id="company_name" label="Company Name" />
          <TableColumn id="representative_email" label="Representative" />
          <TableColumn id="company_nationality" label="Country" width="200px" />
          <TableColumn id="activity_type" label="Type" width="150px" />
          <TableColumn
            id="status"
            label="Status"
            render={(row: IInvestor) => (
              <InvestorStatusBadge value={row.status} />
            )}
            width="110px"
          />
          <TableColumn
            id="action"
            label="Action"
            width="116px"
            render={(row: IInvestor) => (
              <div className="flex space-x-1">
                <Button size="sm" onClick={handleView(row)}>
                  Details
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

export default InvestorList;
