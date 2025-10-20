import React, { ReactNode, forwardRef, useRef } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { useFormContext } from './hooks';
import InputShell from './InputShell';
import 'react-datepicker/dist/react-datepicker.css';
import clsx from 'clsx';
import InputMask from 'react-input-mask';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  note?: string;
  maxDate?: Date;
  minDate?: Date;
}

const InputDateV2 = ({
  name,
  placeholder = 'MM/DD/YYYY',
  required,
  disabled,
  note,
  label,
  maxDate,
  minDate,
}: IProps) => {
  const inputRef = useRef(null);
  const { values, setFieldValue, errors } = useFormContext();
  const error = errors?.[name] as string;
  const value = !isNaN(Date.parse(values[name])) ? new Date(values[name]) : null;
  const handleChange = (v: Date) => {
    setFieldValue(name, formatDate(v));
  };

  return (
    <InputShell label={label} note={error ?? note} optional={!required} error={error}>
      <DatePicker
        selected={value}
        onChange={handleChange}
        name={name}
        placeholderText={placeholder}
        required={required}
        disabled={disabled}
        calendarContainer={MyContainer}
        customInput={<CustomInput ref={inputRef} error={error} />}
        maxDate={maxDate}
        minDate={minDate}
        openToDate={value || maxDate}
        showYearDropdown
        showMonthDropdown
        dropdownMode='select'
      />
    </InputShell>
  );
};

export default InputDateV2;

const CustomInput = forwardRef((props: any, ref) => {
  return (
    <InputMask mask='99/99/9999' maskChar='_' placeholder='DD/MM/YYYY' {...props}>
      {(inputProps: any) => (
        <input
          {...inputProps}
          ref={ref}
          className={clsx(
            'form-input w-full h-10 rounded',
            'text-sm leading-4',
            'placeholder:text-muted focus:ring-outline-active focus:ring-2 focus:border-transparent',
            'disabled:bg-fill-disabled disabled:text-disabled',
            props?.error
              ? 'text-danger bg-danger-light border-danger'
              : 'border-outline focus:bg-primary-light focus:border-primary-base'
          )}
        />
      )}
    </InputMask>
  );
});

CustomInput.displayName = 'CustomInput';

const MyContainer = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className='p-3 rounded bg-white border'>
      <CalendarContainer className={className}>
        <div style={{ position: 'relative' }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

function formatDate(date: Date) {
  try {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  } catch (err) {
    return 'Invalid Date';
  }
}
