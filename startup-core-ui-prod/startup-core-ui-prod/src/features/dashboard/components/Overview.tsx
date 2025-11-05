import { useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { Button } from 'ui/components';
import CountCard from './CountCard';
import DateRange, { IValue } from './DateRange';
import useDashboardTotalCount from '../hooks/useDashboardTotalCount';
import useComprehensiveStatistics from '../hooks/useComprehensiveStatistics';
import InputDateRange from './InputDateRange';

const INIT_STATE: IValue = {
  filter: 'all_time',
  date_from: '',
  date_to: '',
};

interface Props {
  onExport: () => void;
}

const Overview = ({ onExport }: Props) => {
  const [filter, setFilter] = useState(INIT_STATE);
  const { isFetching, data: stats } = useDashboardTotalCount(filter);
  const { data: comprehensiveStats } = useComprehensiveStatistics({});
  
  const cards = [
    {
      label: 'Total Startups',
      value: comprehensiveStats?.overview?.total_startups || 0,
      percent: 0,
      trend: '',
    },
    {
      label: 'Verified Startups',
      value: comprehensiveStats?.overview?.verified_startups || 0,
      percent: 0,
      trend: '',
    },
    {
      label: 'Registered Startups',
      value: stats?.startups_current_count || 0,
      percent: stats?.startups_trend_formatted_value || 0,
      trend: stats?.startups_trend || '',
    },
    {
      label: 'For Verification Startups',
      value: stats?.for_verification_current_count || 0,
      percent: stats?.for_verification_trend_formatted_value || 0,
      trend: stats?.for_verification_trend || '',
    },
    {
      label: 'Total Programs',
      value: stats?.programs_current_count || 0,
      percent: stats?.programs_trend_formatted_value || 0,
      trend: stats?.programs_trend || '',
    },
    {
      label: 'Total Users',
      value: comprehensiveStats?.overview?.total_users || 0,
      percent: 0,
      trend: '',
    },
  ];
  const onChange = (newValue: Partial<IValue> | null) => {
    if (!newValue) {
      setFilter(INIT_STATE);
      return;
    }
    setFilter((s) => ({ ...s, ...newValue }));
  };
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-400">OVERVIEW</p>

        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <DateRange onChange={onChange} value={filter} />

          <InputDateRange
            onChange={onChange}
            value={[filter.date_from, filter.date_to]}
          />

          <Button
            variant="primary"
            leadingIcon={<HiInformationCircle />}
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card, i) => (
          <CountCard key={i} {...card} isLoading={isFetching} />
        ))}
      </div>
    </>
  );
};

export default Overview;
