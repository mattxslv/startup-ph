import { useRef, useState } from 'react';
import { FilterWrapper } from 'ui/forms';
import useDebounceEffect from 'hooks/useDebounceEffect';
import { TStartUp } from '../startup';

export interface IFilter {
  page: number;
  q: string;
  status: TStartUp['status'];
  status_by: string;
}

const KEY_LABEL = {
  q: 'Keyword Search',
  status: 'Status',
};

export const INIT_FILTER_STATE: IFilter = {
  page: 1,
  q: '',
  status: 'FOR VERIFICATION',
  status_by: 'desc',
};

function StartUpFilter({
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

export default StartUpFilter;
