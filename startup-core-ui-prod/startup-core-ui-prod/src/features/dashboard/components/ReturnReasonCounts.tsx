import useReturnStartupList from 'features/dashboard/hooks/useReturnStartupList';
import { useMemo, useState } from 'react';
import { Table, TableColumn } from 'ui/components';
import InputDateRange from './InputDateRange';
import { IValue } from './DateRange';

const INIT_FILTER = {
  order_by: 'created_at',
  status_by: 'desc',
  date_from: '',
  date_to: '',
};

const ReturnReasonCounts = () => {
  const [filter, setFilter] = useState(INIT_FILTER);
  const { isFetching, data } = useReturnStartupList(filter);
  const newList = useMemo(() => {
    if (data?.list) {
      return [...data.list, { label: 'TOTAL', count: data?.total || 0 }];
    }
    return [];
  }, [data]);

  const onChange = (newValue: Partial<IValue> | null) => {
    if (!newValue) {
      setFilter(INIT_FILTER);
      return;
    }
    setFilter((s) => ({ ...s, ...newValue }));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 font-semibold pt-2">
          Verification Application Return Reasons
        </p>

        <div>
          <InputDateRange
            onChange={onChange}
            value={[filter.date_from, filter.date_to]}
          />
        </div>
      </div>
      <div className="bg-white">
        <Table isLoading={isFetching} data={newList}>
          <TableColumn
            id="label"
            label="REASON FOR RETURN"
            width="80%"
            className="text-xs"
          />
          <TableColumn
            id="count"
            label="COUNT"
            width="20%"
            className="text-xs text-right"
          />
        </Table>
      </div>
    </>
  );
};

export default ReturnReasonCounts;
