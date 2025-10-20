import React from 'react';
import InlineToggle from '../inline-toggle/InlineToggle';
import { useFormContext } from './hooks';
import InputShell from './InputShell';

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  label?: string;
  note?: string;
  trailing?: React.ReactNode;
}

function InputToggle({ name, label, required, note, trailing, className }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = (newValue: boolean) => {
    setFieldValue(name, newValue);
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
      <InlineToggle label={label} onChange={handleChange} value={values[name]} />
    </InputShell>
  );
}

export default InputToggle;
