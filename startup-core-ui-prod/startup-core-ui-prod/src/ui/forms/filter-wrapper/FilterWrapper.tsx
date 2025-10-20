import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HiSearch, HiXCircle } from 'react-icons/hi';
import clsx from 'clsx';
import { CgSpinner } from 'react-icons/cg';
import { Badge, Button } from 'ui/components';
import { ISelectOption } from '../types';
import { isEmpty } from 'lodash';

interface IFilterWrapper {
  isLoading?: boolean;
  onChange: (x: any) => any;
  value: any;
  children?: JSX.Element | JSX.Element[] | undefined;
  keyLabel: { [key: string]: string | null };
  placeholder?: string;
  noKeywordSearch?: boolean;
  filterLabel?: string;
  searchKey?: string;
}

const parseBadgeValue = (val: string | string[] | ISelectOption) => {
  if (typeof val === 'string') return val;
  if ('label' in val) return val.label;
  if (Array.isArray(val)) return val.join(', ');
  return val;
};

export const FilterAction = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="flex justify-start space-x-1 flex-row-reverse space-x-reverse">
      <Button size="sm" variant="primary" type="submit">
        Submit
      </Button>
      <Button size="sm" type="button" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

const FilterWrapper = forwardRef(
  (
    {
      isLoading,
      children,
      value,
      onChange,
      keyLabel,
      placeholder,
      noKeywordSearch,
      filterLabel = 'Filter',
      searchKey = 'q',
    }: IFilterWrapper,
    ref
  ) => {
    const [dropdown, setDropdown] = useState(false);
    const [withAdvance, badges] = useMemo((): [boolean, string[]] => {
      const arr = [];
      let withAdv = false;
      for (const [key, val] of Object.entries<[string, any]>(value)) {
        if (key === 'page') continue;
        if (keyLabel[key] === null) continue;
        if (!isEmpty(val)) {
          if (key !== searchKey) withAdv = true;
          arr.push(
            `${keyLabel[key] ?? keyLabel.default}: ${parseBadgeValue(val)} `
          );
        }
      }
      return [withAdv, arr];
    }, [value, keyLabel, searchKey]);
    const handleOpenAdvance = () => {
      setDropdown(true);
    };
    const handleCloseAdvance = () => {
      setDropdown(false);
    };
    const handleClear = () => {
      onChange((state: any) => ({ ...state, [searchKey]: '' }));
    };
    useImperativeHandle(ref, () => ({ setDropdown }), [setDropdown]);
    const renderBody = useMemo(() => {
      if (withAdvance) {
        return (
          <div
            className="text-placeholder flex flex-wrap items-center pl-2 min-h-[24px] gap-1"
            onClick={() => setDropdown(true)}
          >
            {React.Children.toArray(
              badges.map((item: string) => <Badge>{item}</Badge>)
            )}
          </div>
        );
      }
      if (noKeywordSearch) {
        return (
          <input
            placeholder={placeholder ?? 'Search...'}
            onFocus={() => {
              handleOpenAdvance();
            }}
            className={clsx(
              'w-full focus:outline-none',
              'px-2',
              dropdown || withAdvance
                ? 'text-transparent placeholder:text-transparent'
                : ''
            )}
          />
        );
      }
      return (
        <input
          placeholder={placeholder ?? 'Search...'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange((state: any) => ({
              ...state,
              [searchKey]: e.target.value,
            }))
          }
          className={clsx(
            'w-full focus:outline-none',
            'px-2',
            dropdown || withAdvance
              ? 'text-transparent placeholder:text-transparent'
              : ''
          )}
          value={value?.[searchKey]}
        />
      );
    }, [
      withAdvance,
      value,
      dropdown,
      badges,
      onChange,
      placeholder,
      noKeywordSearch,
      searchKey,
    ]);
    return (
      <Popover className="relative z-20">
        <div className="relative rounded border border-outline flex min-h-[2.5rem] px-3 py-1 bg-white">
          <div className="pointer-events-none flex items-center flex-shrink-0 relative z-10">
            {isLoading ? (
              <CgSpinner className="h-4 w-4 animate-spin" />
            ) : (
              <HiSearch
                className="h-4 w-4 text-placeholder"
                aria-hidden="true"
              />
            )}
          </div>
          {dropdown ? (
            <div className="absolute inset-y-0 bg-white w-full rounded left-0 text-placeholder text-sm flex items-center pl-8">
              Choose filter
            </div>
          ) : null}
          {renderBody}
          {value?.[searchKey] && !children ? (
            <button
              className="absolute inset-y-0 right-[2px] pr-2 group"
              type="button"
              title="clear"
              onClick={handleClear}
            >
              <HiXCircle className="h-5 w-5 text-placeholder group-hover:text-slate-300" />
            </button>
          ) : null}
          {children ? (
            <div className="flex items-center flex-shrink-0 ml-auto relative z-10">
              {dropdown ? (
                <button
                  className="text-xs leading-4 font-semibold text-primary-base flex space-x-1 items-center hover:text-primary-base focus:outline-none focus:underline"
                  type="button"
                  onClick={handleCloseAdvance}
                >
                  <span>Cancel</span>
                </button>
              ) : (
                <button
                  className="text-xs leading-4 font-semibold text-primary-base flex space-x-1 items-center hover:text-primary-base focus:outline-none focus:underline"
                  type="button"
                  onClick={handleOpenAdvance}
                >
                  <span>{filterLabel}</span>
                </button>
              )}
            </div>
          ) : null}
        </div>
        <Transition
          show={dropdown}
          // enter="transition duration-500 ease-out"
          // enterFrom="transform scale-95 opacity-0"
          // enterTo="transform scale-100 opacity-100"
          // leave="transition duration-75 ease-out"
          // leaveFrom="transform scale-100 opacity-100"
          // leaveTo="transform scale-95 opacity-0"
          enter="transition ease-in-out origin-top-right duration-200"
          enterFrom="opacity-0 transform scale-90"
          enterTo="opacity-100 transform scale-100"
          leave="transition origin-top-right ease-in-out duration-100"
          leaveFrom="opacity-100 transform ease-in-out scale-100"
          leaveTo="opacity-0 transform scale-90"
        >
          <Popover.Panel static>
            <div className="absolute right-0 shadow-dropdown bg-white w-full p-4 border border-outline translate-y-1 rounded max-w-sm">
              {children}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  }
);

FilterWrapper.displayName = 'Filter Wrapper';

export default FilterWrapper;
