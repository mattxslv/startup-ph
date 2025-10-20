import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { useFormContext } from './hooks';
import InputShell from './InputShell';

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  name: string;
  label?: string | ReactNode;
  note?: string;
  options: TSelectOption[];
  placeholder?: string;
  cb?: (field: string) => void;
}

function InputSelect({ name, label, required, note, options, placeholder, cb, ...rest }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(name, target.value);
    cb && name && cb(name);
  };
  const error = errors?.[name] as string;
  return (
    <InputShell label={label} note={error ?? note} optional={!required} error={error}>
      <select
        className={clsx(
          'form-select w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-disabled focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error
            ? 'text-danger bg-danger-light border-danger'
            : 'border-outline focus:bg-primary-light focus:border-primary-base'
        )}
        title={typeof label === 'string' ? label : ''}
        required={required}
        onChange={handleChange}
        value={values[name] ?? ''}
        {...rest}
      >
        <option value='' disabled>
          {placeholder ?? '- Select -'}
        </option>
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
