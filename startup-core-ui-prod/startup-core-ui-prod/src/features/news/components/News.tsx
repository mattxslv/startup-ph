import clsx from 'clsx';
import ListView, { INIT_FILTER_STATE } from 'layouts/LayoutList';
import { INews } from '../types';
import useNewsList from '../hooks/useNewsList';
import NewsById from './NewsById';
import { Badge, BadgeArray, Button, Img } from 'ui/components';
import { showNewsModal } from '../modal/NewsModal';
import { useState } from 'react';
import { Acl } from 'features/profile';

type Props = {};

function ListItem({
  data,
  onSelect,
  isSelected,
}: {
  data: INews;
  onSelect: (x: INews | undefined) => void;
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
          alt={data.title}
        />
      </div>
      <div
        className={clsx('flex-1 min-w-0', isSelected ? 'font-semibold' : '')}
      >
        <div className="truncate">{data.title}</div>
        {data.is_published ? (
          <div className="text-xs">
            <BadgeArray list={data.tags} />
          </div>
        ) : (
          <div className="text-xs">
            <Badge variant="base">Draft</Badge>
          </div>
        )}
      </div>
    </div>
  );
}

function News({}: Props) {
  const [filter, setFilter] = useState(INIT_FILTER_STATE);
  return (
    <ListView
      listItem={(item, onSelect, isSelected) => (
        <ListItem data={item} onSelect={onSelect} isSelected={isSelected} />
      )}
      action={
        <Acl code={['news-manage']}>
          <Button
            className="w-full"
            variant="primary"
            onClick={() => {
              showNewsModal({});
            }}
          >
            Add
          </Button>
        </Acl>
      }
      hook={useNewsList}
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
        return <NewsById id={selected.id} resetSelected={resetSelected} />;
      }}
    </ListView>
  );
}

export default News;
