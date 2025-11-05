import { useRef, useState } from 'react';

import { FilterAction, FilterWrapper, Form, Input } from 'ui/forms';
import useDebounceEffect from 'hooks/useDebounceEffect';

export interface IFilter {
  page: number;
  per_page: number;
  q: string;
}

const KEY_LABEL = {
  q: 'Keyword Search',
};

export const INIT_FILTER_STATE: IFilter = {
  page: 1,
  per_page: 1000,
  q: '',
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
    <div className="p-4">
      <FilterWrapper
        ref={filterRef}
        isLoading={isLoading}
        onChange={setFilter}
        value={filter}
        keyLabel={KEY_LABEL}
        placeholder="Search administrators..."
        filterLabel="Adv"
        searchKey="q"
      />
    </div>
  );
}

export default ACLFilter;
