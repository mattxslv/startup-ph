import clsx from 'clsx';
import { isEqual } from 'lodash';
import React, { createContext, ReactElement } from 'react';
import Empty from './Empty';
import Skeleton from './Skeleton';

type TTableColumn = typeof TableColumn;

interface ITableContext<T> {
  selected?: T;
}
const TableContext = createContext<ITableContext<unknown> | null>(null);

interface IColumnProps<T> {
  id: string;
  label: string;
  render?: ((row: T) => React.ReactNode) | undefined;
  width?: string;
  className?: string;
}

interface IColumnRowProps<T> extends IColumnProps<T> {
  data?: any;
}

export const TableColumn = ({ id, label, render }: IColumnRowProps<any>) => {
  return null;
};

interface ITableProps<T = unknown> {
  data: T[];
  isLoading?: boolean;
  children: Array<ReactElement<TTableColumn>> | ReactElement<TTableColumn>;
  onRowClick?: (r: T) => void;
  selected?: T;
  isError?: boolean;
  refetch?: () => void;
  emptyMessage?: string;
  loadingRowCount?: number;
}

function TableTh<T>({ label, width, className }: IColumnProps<T>) {
  return (
    // <th scope="col" className="sticky top-0 z-10 border-slate-300 bg-slate-50 bg-opacity-75 backdrop-blur backdrop-filter hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 lg:table-cell">
    <th
      scope="col"
      className={clsx(
        'sticky top-[-1px] z-10 border-slate-300 bg-slate-50 bg-opacity-75 backdrop-blur backdrop-filter py-3.5 px-6 text-left text-sm font-semibold text-slate-900',
        className,
        'whitespace-nowrap'
      )}
      style={{ width: width ?? 'auto' }}
    >
      {label}
    </th>
  );
}
function TableTd<T>({ id, render, data, className }: IColumnRowProps<T>) {
  const content = typeof render === 'function' ? render(data) : data[id];
  return (
    // <th scope="col" className="sticky top-0 z-10 border-slate-300 bg-slate-50 bg-opacity-75 backdrop-blur backdrop-filter hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 lg:table-cell">
    <td className={clsx('px-6 py-4 text-sm', className)}>{content}</td>
  );
}

function Table<T>({
  isLoading,
  loadingRowCount = 8,
  data,
  children: raw,
  onRowClick,
  selected,
  refetch,
  emptyMessage,
}: ITableProps<T>) {
  const children = Array.isArray(raw) ? raw : [raw];
  const handleRowClick = (row: T) => () => {
    onRowClick?.(row);
  };
  return (
    <TableContext.Provider value={{ selected }}>
      {!data?.length ? (
        <>
          {isLoading ? (
            <Skeleton noOfRow={loadingRowCount} />
          ) : (
            <Empty
              className="!h-full"
              message={emptyMessage ?? 'There are no items'}
              reload={refetch}
            />
          )}
        </>
      ) : (
        <div className="inline-block min-w-full align-middle">
          <div className="shadow-sm ring-1 ring-black ring-opacity-5">
            <table className="min-w-full border-spacing-0">
              <thead className="bg-slate-300">
                <tr>
                  {React.Children.toArray(
                    children.map((row: ReactElement) => {
                      const item = row.props as IColumnProps<T>;
                      return (
                        <TableTh<T>
                          id={item.id}
                          className={item.className}
                          label={item.label}
                          width={item?.width}
                        />
                      );
                    })
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {!data?.length}
                {data.length < 1 ? (
                  <tr>
                    <td colSpan={children.length}>
                      <div className="text-center font-light text-slate-500 py-4">
                        {isLoading ? 'Loading...' : 'There are no items.'}
                      </div>
                    </td>
                  </tr>
                ) : (
                  React.Children.toArray(
                    data.map((row) => (
                      <tr
                        className={clsx(
                          onRowClick
                            ? 'cursor-pointer hover:bg-fill-light'
                            : '',
                          isEqual(selected, row) ? 'bg-primary-light' : ''
                        )}
                        onClick={handleRowClick(row)}
                      >
                        {React.Children.toArray(
                          children.map((c: ReactElement) => {
                            const col = c.props as IColumnRowProps<T>;
                            return (
                              <TableTd<T>
                                id={col.id}
                                label={col.label}
                                className={col.className}
                                data={row}
                                render={col.render}
                                width={col?.width}
                              />
                            );
                          })
                        )}
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </TableContext.Provider>
  );
}

export default Table;
