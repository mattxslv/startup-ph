import clsx from 'clsx';
import React, { useMemo } from 'react';
import { HiX } from 'react-icons/hi';
import { Badge } from 'ui/components';
import { useFormContext } from '../hooks';
import InputShell from '../input-shell/InputShell';
import { ISelectOption } from '../types';

interface Props {
  name: string;
  label?: string;
  note?: string;
  required?: boolean;
  options: ISelectOption[];
  optionsLoading?: boolean;
}

function InputTags({
  name,
  label,
  required,
  note,
  options,
  optionsLoading,
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(
      name,
      Array.from(new Set([...(values[name] ?? []), target.value]))
    );
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
      (values[name] ?? []).filter((x: string) => x !== row)
    );
  };
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
    >
      <div className="relative min-h-[2.5rem] rounded px-3 py-2 flex items-center">
        <select
          className={clsx(
            'absolute inset-0 w-full form-select rounded',
            'text-sm leading-4',
            'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
            'disabled:bg-fill-disabled disabled:text-disabled',
            error
              ? 'text-danger-base bg-danger-light border-danger-base'
              : 'border-outline focus:bg-primary-light focus:border-primary-base'
          )}
          onChange={handleChange}
          value=""
          title={label}
        >
          <option value="">- Select -</option>
          {options.map((item: ISelectOption) => {
            const isAdded = (values[name] ?? []).indexOf(item.value) > -1;
            return (
              <option key={item.value} value={item.value} disabled={isAdded}>
                {item.label}
                {isAdded ? ' (Added)' : ''}
              </option>
            );
          })}
        </select>
        <div className="flex flex-wrap -mb-1 relative z-10 pointer-events-none pr-5">
          {optionsLoading ? (
            <div className="text-placeholder text-sm">Loading...</div>
          ) : (
            (values[name] ?? []).map((item: string) => (
              <Badge
                key={item}
                className="mb-1 mr-1 truncate max-w-xs"
                variant="primary"
                trailing={
                  <button
                    className="focus:outline-none focus:ring-1 ring-outline-active rounded-sm pointer-events-auto"
                    title="Remove Item"
                    type="button"
                    onClick={handleOmit(item)}
                  >
                    <HiX />
                  </button>
                }
              >
                {flatLabels[item]}
              </Badge>
            ))
          )}
        </div>
      </div>
    </InputShell>
  );
}

export default InputTags;
