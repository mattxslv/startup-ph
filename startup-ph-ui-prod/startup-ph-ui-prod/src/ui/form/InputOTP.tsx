import React from 'react';
import { useFormContext } from './hooks';
import InputShell from './InputShell';
import OtpInput, { OTPInputProps } from 'react-otp-input';
import clsx from 'clsx';

interface Props extends Partial<OTPInputProps> {
  name: string;
  label?: string;
  note?: React.ReactNode;
  reset?: boolean;
  required?: boolean;
  containerClass?: string;
  inputStyle?: string;
  shouldAutoFocus?: boolean;
  numInputs: number;
}

function InputOTP(props: Props) {
  const {
    name,
    label,
    note,
    reset,
    required,
    containerClass,
    inputStyle,
    shouldAutoFocus = true,
    numInputs,
  } = props;
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = (newValue: string) => {
    setFieldValue(name, newValue);
  };
  const handleReset = () => {
    setFieldValue(name, '');
  };
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
      reset={reset}
      handleReset={handleReset}
    >
      <OtpInput
        value={values[name] ?? ''}
        onChange={handleChange}
        numInputs={numInputs}
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus={shouldAutoFocus}
        containerStyle={clsx('gap-2 justify-center', containerClass)}
        inputStyle={clsx(
          'w-full h-20 rounded-lg text-4xl outline-none border-none ring-1 ring-gray-200 p-2 grow',
          inputStyle,
          error
            ? 'text-danger bg-danger-light border-danger'
            : 'border-outline focus:bg-primary-light focus:border-primary-base'
        )}
      />
    </InputShell>
  );
}

export default InputOTP;
