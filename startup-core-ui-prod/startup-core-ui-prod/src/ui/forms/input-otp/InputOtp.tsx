import React from 'react';
import clsx from 'clsx';
import OtpInput from 'react-otp-input';
import { useFormContext } from '../hooks';
import InputShell from '../input-shell/InputShell';

interface Props {
  name: string;
  label?: string;
  note?: string;
  length?: number;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

function InputOtp({
  name,
  label,
  note,
  length = 6,
  required,
  className,
  disabled,
  autoFocus,
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const error = errors?.[name] as string;
  const value = (values[name] || '').toString();

  const handleChange = (otp: string) => {
    setFieldValue(name, otp);
  };

  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
    >
      <div className={className}>
        <OtpInput
          value={value}
          onChange={handleChange}
          numInputs={length}
          renderInput={(props) => (
            <input
              {...props}
              className={clsx(
                'form-input text-center',
                'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
                'disabled:bg-fill-disabled disabled:text-disabled',
                error
                  ? 'text-danger-base bg-danger-light border-danger-base'
                  : 'border-outline focus:bg-primary-light focus:border-primary-base'
              )}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          )}
          inputType="tel"
          shouldAutoFocus={autoFocus}
          containerStyle="flex justify-center gap-2"
          inputStyle={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        />
      </div>
    </InputShell>
  );
}

export default InputOtp;
