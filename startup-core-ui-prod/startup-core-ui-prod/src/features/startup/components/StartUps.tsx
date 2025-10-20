import clsx from 'clsx';
import ListView, { INIT_FILTER_STATE } from 'layouts/LayoutList';
import useStartUpList from '../hooks/useStartUpList';
import StartUpById from './StartUpById';
import { Img } from 'ui/components';
import StartupStatusBadge from './StartupStatusBadge';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TStartUp } from '../startup';

function ListItem({
  data,
  onSelect,
  isSelected,
}: {
  data: TStartUp;
  onSelect: (x: TStartUp | undefined) => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={clsx(
        'relative py-2 px-3 text-sm flex items-center hover:bg-slate-100 transition',
        isSelected ? 'bg-primary-light' : ''
      )}
    >
      <button
        className="z-20 absolute inset-0 h-full w-full"
        type="button"
        onClick={() => onSelect(data)}
      />
      <div className="mr-3">
        <Img
          className="h-12 w-16"
          imgClassName="object-cover object-center rounded"
          src={data.logo_url}
          alt={data.name}
        />
      </div>
      <div
        className={clsx('flex-1 min-w-0', isSelected ? 'font-semibold' : '')}
      >
        <div className="truncate">{data.name}</div>
        <div>
          <StartupStatusBadge value={data.status} />
        </div>
      </div>
    </div>
  );
}

function StartUps() {
  const { type } = useParams() as TStartupParams;
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  const badgeFilter = [
    { label: 'Verified', value: 'VERIFIED' },
    { label: 'For Resubmission', value: 'FOR RESUBMISSION' },
    { label: 'Rejected', value: 'REJECTED' },
  ];

  useEffect(() => {
    setFilter({
      ...INIT_FILTER_STATE,
      ...(type === 'for-verification' && { status: 'FOR VERIFICATION' }),
    });
  }, [type]);

  return (
    <ListView
      listItem={(item, onSelect, isSelected) => (
        <ListItem data={item} onSelect={onSelect} isSelected={isSelected} />
      )}
      hook={useStartUpList}
      filter={filter}
      onFilterChange={setFilter}
      badgeFilter={type === 'for-verification' ? undefined : badgeFilter}
    >
      {({ selected, resetSelected }) => {
        if (!selected?.id)
          return (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-100">
              No item selected, please select one.
            </div>
          );
        return <StartUpById id={selected.id} resetSelected={resetSelected} />;
      }}
    </ListView>
  );
}

export default StartUps;
