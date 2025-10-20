// components/drawer/FilterDrawer.tsx
import { showDrawer } from '@/components/drawer';
import InputDatasetTags from '@/feature/dataset/InputDatasetTags';
import useDatasetOptions from '@/feature/dataset/useDatasetOptions';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import InputSelect from '@/ui/form/InputSelect';
import React from 'react';
import { IFilter } from '..';

interface Props {
  onClose: () => void;
  handleSubmit: (payload: IFilter) => void;
  filter: IFilter;
}

export const showFilterDrawer = (handleSubmit: (payload: IFilter) => void, filter: IFilter) => {
  showDrawer({
    id: 'filter-drawer',
    component: FilterDrawer,
    position: 'right',
    width: '300px',
    props: {
      handleSubmit,
      filter,
    },
  });
};

function FilterDrawer({ onClose, handleSubmit, filter }: Props) {
  const onSubmit = (payload: IFilter) => {
    handleSubmit(payload);
    onClose();
  };
  return (
    <Form className='flex flex-col h-full' onSubmit={onSubmit} initialValues={filter}>
      <div className='flex items-center justify-between p-4 border-b'>
        <h2 className='text-xl font-semibold'>Filter</h2>
        <button
          onClick={onClose}
          className='p-2 hover:bg-gray-100 rounded-full'
          aria-label='Close drawer'
        >
          ✕
        </button>
      </div>

      <FilterForm />

      <div className='border-t p-4 bg-gray-50 mt-auto'>
        <div className='flex justify-end gap-2'>
          <Button variant='link' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Apply Filters
          </Button>
        </div>
      </div>
    </Form>
  );
}

const FilterForm = () => {
  const { data: sectors } = useDatasetOptions('sector');
  const { data: developmentPhases } = useDatasetOptions('development-phase');

  return (
    <div className='flex flex-col gap-5 p-5'>
      <InputSelect name='sector' label='Startup Sector' options={sectors?.options || []} required />
      <InputSelect
        name='development_phase'
        label='Development Phase'
        options={developmentPhases?.options || []}
        required
      />
    </div>
  );
};

export default FilterDrawer;
