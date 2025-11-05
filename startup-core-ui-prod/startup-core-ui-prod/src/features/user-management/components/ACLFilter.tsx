import { useRef, useState } from 'react';

import { FilterAction, FilterWrapper, Form, Input, InputSelect } from 'ui/forms';
import useDebounceEffect from 'hooks/useDebounceEffect';

export interface IFilter {
  page: number;
  per_page: number;
  q: string;
  user_type?: string;
  is_test_account?: string;
}

const KEY_LABEL = {
  q: 'Keyword Search',
  user_type: 'User Type',
  is_test_account: 'Test Accounts',
};

const USER_TYPE_OPTIONS = [
  { label: 'All User Types', value: '' },
  { label: 'Visitor', value: 'visitor' },
  { label: 'Startup', value: 'startup' },
];

const TEST_ACCOUNT_OPTIONS = [
  { label: 'All Accounts', value: '' },
  { label: 'Hide Test Accounts', value: '0' },
  { label: 'Show Only Test Accounts', value: '1' },
];

export const INIT_FILTER_STATE: IFilter = {
  page: 1,
  per_page: 1000,
  q: '',
  user_type: '',
  is_test_account: '',
};

function ACLFilter({
  isLoading,
  onChange,
}: {
  isLoading?: boolean;
  onChange: (x: IFilter) => void;
}) {
  const filterRef = useRef<any>(null);
  const [filter, setFilter] = useState<IFilter>(INIT_FILTER_STATE);
  useDebounceEffect(onChange, filter);

  const handleSubmit = (v: IFilter) => {
    filterRef.current.setDropdown(false);
    setFilter(v);
  };
  
  return (
    <div className="p-4 space-y-4">
      <FilterWrapper
        ref={filterRef}
        isLoading={isLoading}
        onChange={setFilter}
        value={filter}
        keyLabel={KEY_LABEL}
        placeholder="Search..."
        filterLabel="Adv"
        searchKey="q"
      />
      
      <div className="flex gap-3">
        <InputSelect
          name="user_type"
          value={filter.user_type || ''}
          onChange={(e) => setFilter({ ...filter, user_type: e.target.value, page: 1 })}
          options={USER_TYPE_OPTIONS}
          className="flex-1"
        />
        
        <InputSelect
          name="is_test_account"
          value={filter.is_test_account || ''}
          onChange={(e) => setFilter({ ...filter, is_test_account: e.target.value, page: 1 })}
          options={TEST_ACCOUNT_OPTIONS}
          className="flex-1"
        />
      </div>
    </div>
  );
}

export default ACLFilter;
