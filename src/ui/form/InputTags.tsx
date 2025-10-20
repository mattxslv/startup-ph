import clsx from 'clsx';
import React, { useMemo } from 'react';
import { HiX } from 'react-icons/hi';
import { useFormContext } from './hooks';
import InputShell from './InputShell';
import Badge from '../badge/Badge';

interface Props {
  name: string;
  label?: string;
  note?: string;
  required?: boolean;
  options: TSelectOption[];
  optionsLoading?: boolean;
}

function InputTags({ name, label, required, note, options, optionsLoading }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const value = Array.isArray(values[name]) ? values[name] : [];
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(name, Array.from(new Set([...value, target.value])));
  };
  const flatLabels = useMemo(() => {
    const opt: Record<string, string> = {};
    options.forEach((v) => {
      opt[v.value] = v.label;
    });
    return opt;
  }, [options]);
  const handleOmit = (row: string) => () => {
    setFieldValue(
      name,
      value.filter((x: string) => x !== row)
    );
  };
  const error = errors?.[name] as string;
  return (
    <InputShell label={label} note={error ?? note} optional={!required} error={error}>
      <div className='relative min-h-[2.5rem] rounded px-3 py-2 flex items-center'>
        <select
          className={clsx(
            'absolute inset-0 w-full form-select text-transparent rounded',
            'text-sm leading-4',
            'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
            'disabled:bg-fill-disabled disabled:text-disabled',
            error
              ? 'text-danger-base bg-danger-light border-danger-base'
              : 'border-outline focus:bg-primary-light focus:border-primary-base'
          )}
          onChange={handleChange}
          value=''
          title={label}
        >
          <option value=''>- Select -</option>
          {options.map((item: TSelectOption) => {
            const isAdded = value.includes(item.value);
            return (
              <option
                key={item.value}
                value={item.value}
                disabled={isAdded}
                className='text-gray-500'
              >
                {item.label}
                {isAdded ? ' (Added)' : ''}
              </option>
            );
          })}
        </select>
        <div className='flex flex-wrap -mb-1 relative z-10 pointer-events-none pr-5'>
          {optionsLoading ? (
            <div className='text-placeholder text-sm'>Loading...</div>
          ) : (
            value.map((item: string) => (
              <Badge
                key={item}
                className='mb-1 mr-1 truncate max-w-xs'
                variant='primary'
                trailing={
                  <button
                    className='focus:outline-none focus:ring-1 ring-outline-active rounded-sm pointer-events-auto'
                    title='Remove Item'
                    type='button'
                    onClick={handleOmit(item)}
                  >
                    <HiX />
                  </button>
                }
              >
                {flatLabels[item] || item}
              </Badge>
            ))
          )}
        </div>
      </div>
    </InputShell>
  );
}

export default InputTags;
