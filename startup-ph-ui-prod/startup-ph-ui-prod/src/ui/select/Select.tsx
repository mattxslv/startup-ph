// components/Select/Select.tsx
import React from 'react';
import clsx from 'clsx';

interface ISelectProps {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  options: TSelectOption[];
  required?: boolean;
  error?: string;
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  [key: string]: any;
}

// components/Select/styles.ts
const selectStyles = {
  base: 'form-select w-full h-10 rounded text-sm leading-4',
  state: {
    default: 'border-outline focus:bg-primary-light focus:border-primary-base',
    error: 'text-danger bg-danger-light border-danger',
  },
  focus:
    'placeholder:text-disabled focus:ring-outline-active focus:ring-2 focus:border-transparent',
  disabled: 'disabled:bg-fill-disabled disabled:text-disabled',
};

const Select: React.FC<ISelectProps> = ({
  name,
  label,
  placeholder = '- Select -',
  options,
  required = false,
  error,
  value = '',
  handleChange,
  ...rest
}) => {
  return (
    <select
      name={name}
      className={clsx(
        selectStyles.base,
        selectStyles.focus,
        selectStyles.disabled,
        error ? selectStyles.state.error : selectStyles.state.default
      )}
      title={typeof label === 'string' ? label : ''}
      required={required}
      onChange={handleChange}
      value={value}
      {...rest}
    >
      <option value='' disabled>
        {placeholder}
      </option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
