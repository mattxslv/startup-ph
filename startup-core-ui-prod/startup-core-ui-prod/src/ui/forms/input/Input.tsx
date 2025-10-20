import clsx from 'clsx';
import React from 'react';
import { useFormContext } from '../hooks';
import InputShell from '../input-shell/InputShell';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label?: string;
  note?: string;
  trailing?: React.ReactNode;
}

function Input({
  name,
  label,
  required,
  note,
  trailing,
  className,
  ...rest
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, target.value);
  };
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
      trailing={trailing}
    >
      <input
        className={clsx(
          'form-input w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error
            ? 'text-danger-base bg-danger-light border-danger-base'
            : 'border-outline focus:bg-primary-light focus:border-primary-base',
          className
        )}
        type="text"
        title={label}
        required={required}
        onChange={handleChange}
        value={values[name] ?? ''}
        {...rest}
      />
    </InputShell>
  );
}

export default Input;
