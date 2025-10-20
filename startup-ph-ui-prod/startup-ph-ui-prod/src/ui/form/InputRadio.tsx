import React from 'react';
import { useFormContext } from './hooks';
import InputShell from './InputShell';

interface Props {
  name: string;
  label?: string;
  note?: string;
  options: TSelectOption[];
  required?: boolean;
  className?: string;
  onChange?: (value: string | number) => void;
}

function InputRadio({
  name,
  label,
  required,
  note,
  options,
  className = 'mb-6',
  onChange,
  ...rest
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const error = errors?.[name] as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setFieldValue(name, +rawValue);
    onChange?.(rawValue);
  };

  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
      className={className}
    >
      {options.map((option) => (
        <label key={option.value} className='mr-5 inline-flex items-center'>
          <input
            className='form-radio text-black'
            name={name}
            value={option.value}
            type='radio'
            onChange={handleChange}
            checked={option.value === values[name]}
            title={option.label}
          />
          <span className='pl-2.5 text-sm font-semibold text-[#2C2C2E]'>{option.label}</span>
        </label>
      ))}
    </InputShell>
  );
}

export default InputRadio;
