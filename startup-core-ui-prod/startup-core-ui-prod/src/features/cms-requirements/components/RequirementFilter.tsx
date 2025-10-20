import { useRef, useState } from 'react';

import { FilterAction, FilterWrapper, Form, Input } from 'ui/forms';
import useDebounceEffect from 'hooks/useDebounceEffect';

export interface IFilter {
  page: number;
  q: string;
}

const KEY_LABEL = {
  q: 'Keyword Search',
};

export const INIT_FILTER_STATE = {
  page: 1,
  q: '',
};

function RequirementFilter({
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
    /* <Form<IFilter>
      className="space-y-4"
      initialValues={filter}
      onSubmit={handleSubmit}
    >
      {({ setValues }) => (
        <>
          <Input name="q" label="Search" required />
          <FilterAction
            onReset={() => {
              setValues(INIT_FILTER_STATE)
            }}
          />
        </>
      )}
    </Form>
  </FilterWrapper> */
  );
}

export default RequirementFilter;
