import clsx from 'clsx';
import React from 'react';
import { useFormContext } from './hooks';
import InputShell from './InputShell';

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  label?: string;
  note?: string | React.ReactNode;
  trailing?: React.ReactNode;
  showCounter?: boolean;
  maxLength?: number;
}

function Input({
  name,
  label,
  required,
  note,
  trailing,
  className,
  showCounter = false, // Default to false
  maxLength,
  ...rest
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const currentLength = (values[name] ?? '').length;
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, target.value);
  };
  const error = errors?.[name] as string;

  const CharacterCounter = () => (
    <div className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted pointer-events-none'>
      {currentLength}
      {maxLength ? `/${maxLength}` : ''}
    </div>
  );

  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
      trailing={trailing}
    >
      <div className='relative'>
        <input
          name={name}
          className={clsx(
            'form-input w-full h-10 rounded',
            'text-sm leading-4',
            'placeholder:text-disabled focus:ring-outline-active focus:ring-2 focus:border-transparent',
            'disabled:bg-fill-disabled disabled:text-disabled',
            showCounter && 'pr-16', // Add padding-right when counter is shown
            error
              ? 'text-danger bg-danger-light border-danger'
              : 'border-outline focus:bg-primary-light focus:border-primary-base',
            className
          )}
          type='text'
          title={label}
          required={required}
          onChange={handleChange}
          value={values[name] ?? ''}
          maxLength={maxLength}
          {...rest}
        />
        {showCounter && <CharacterCounter />}
      </div>
    </InputShell>
  );
}

export default Input;
