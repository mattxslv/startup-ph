import clsx from 'clsx';
import React from 'react';
import { useFormContext } from '../hooks';
import InputShell from '../input-shell/InputShell';
import { ISelectOption } from '../types';

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  name: string;
  label?: string;
  note?: string;
  options: ISelectOption[];
  placeholder?: string;
}

function InputSelect({
  name,
  label,
  required,
  note,
  options,
  placeholder,
  ...rest
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(name, target.value);
  };
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
    >
      <select
        className={clsx(
          'form-select w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error
            ? 'text-danger-base bg-danger-light border-danger-base'
            : 'border-outline focus:bg-primary-light focus:border-primary-base'
        )}
        title={label}
        required={required}
        onChange={handleChange}
        value={values[name] ?? ''}
        {...rest}
      >
        <option value="">{placeholder ?? '- Select -'}</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </InputShell>
  );
}

export default InputSelect;
