import clsx from 'clsx';
import React, { useState } from 'react';
import { useFormContext } from '../hooks';
import InputShell from '../input-shell/InputShell';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label?: string;
  note?: string;
}

function InputPassword({ name, label, required, note, ...rest }: Props) {
  const [show, setShow] = useState(false);

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
      trailing={
        <button
          className="text-description"
          type="button"
          title="toggle-pw"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? <HiEye /> : <HiEyeOff />}
        </button>
      }
    >
      <input
        className={clsx(
          'form-input w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error
            ? 'text-danger-base bg-danger-light border-danger-base'
            : 'border-outline focus:bg-primary-light focus:border-primary-base'
        )}
        type={show ? 'text' : 'password'}
        title={label}
        required={required}
        onChange={handleChange}
        value={values[name] ?? ''}
        {...rest}
      />
    </InputShell>
  );
}

export default InputPassword;
