import clsx from 'clsx';
import ListView, { INIT_FILTER_STATE } from 'layouts/LayoutList';
import { IProgram } from '../types';
import useProgramList from '../hooks/useProgramList';
import ProgramById from './ProgramById';
import { Button, Img } from 'ui/components';
import { showProgramModal } from '../modal/ProgramModal';
import { useState } from 'react';
import { Acl } from 'features/profile';

type Props = {};

function ListItem({
  data,
  onSelect,
  isSelected,
}: {
  data: IProgram;
  onSelect: (x: IProgram | undefined) => void;
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
          src={data.thumbnail_url}
          alt={data.name}
        />
      </div>
      <div
        className={clsx('flex-1 min-w-0', isSelected ? 'font-semibold' : '')}
      >
        <div className="truncate">{data.name}</div>
        <div className="text-xs">{data.agency}</div>
      </div>
    </div>
  );
}

function Programs({}: Props) {
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  return (
    <ListView
      listItem={(item, onSelect, isSelected) => (
        <ListItem data={item} onSelect={onSelect} isSelected={isSelected} />
      )}
      action={
        <Acl code={['programs-manage']}>
          <Button
            className="w-full"
            variant="primary"
            onClick={() => {
              showProgramModal({});
            }}
          >
            Add
          </Button>
        </Acl>
      }
      hook={useProgramList}
      filter={filter}
      onFilterChange={setFilter}
    >
      {({ selected, resetSelected }) => {
        if (!selected?.id)
          return (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-100">
              No item selected, please select one.
            </div>
          );
        return <ProgramById id={selected.id} resetSelected={resetSelected} />;
      }}
    </ListView>
  );
}

export default Programs;
