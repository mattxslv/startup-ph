import { useRef, useState } from 'react';
import { HiCalendar } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import { useFormContext } from './hooks';
import InlineInputMask from './InlineInputMask';
import InputShell from './InputShell';
import Dropdown from '../dropdown/Dropdown';
import Input from './Input';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  note?: string;
  value?: string;
  customError?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  min?: Date;
  max?: Date;
}

function InputYear(props: Props) {
  const { name, label, required, note, value, onChange, customError, disabled, min, max } = props;
  const { values, setFieldValue, errors } = useFormContext();
  const dropdownRef = useRef<any>(null);
  //   const handleChange = (newValue: string) => {
  //     console.log(newValue);
  //     if (onChange) {
  //       onChange(newValue);
  //       return;
  //     }
  //     setFieldValue(name, newValue);
  //   };
  const handlePick = (newValue: string) => {
    dropdownRef.current.setShow(false);
    if (onChange) {
      onChange(newValue);
      return;
    }
    setFieldValue(name, newValue);
  };
  const error = customError ?? (errors?.[name] as string);
  return (
    <div className='relative'>
      <Input
        name={name}
        label={`${label}`}
        note={error ?? note}
        required={required}
        trailing={
          <div className='pb-1.5 mt-auto'>
            <button
              className='text-muted text-xl disabled:text-disabled'
              type='button'
              tabIndex={-1}
              title='Open calendar picker'
              onClick={() => dropdownRef.current.setShow((v: boolean) => !v)}
              disabled={disabled}
            >
              <HiCalendar />
            </button>
          </div>
        }
        readOnly
        onClick={() => dropdownRef.current.setShow((v: boolean) => !v)}
      />
      <div className='relative z-10'>
        <Dropdown ref={dropdownRef} alignment='left' width='auto'>
          <div className='bg-white'>
            <Picker onChange={handlePick} value={value ?? values[name] ?? ''} min={min} max={max} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

interface PickerProps {
  onChange: (v: string) => void;
  value: string;
  min?: Date;
  max?: Date;
}

const init = (v: string) => {
  return !isNaN(Date.parse(v)) ? new Date(v) : new Date();
};

function formatDate(date: Date) {
  try {
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // const day = date.getDate().toString().padStart(2, '0');
    const year = String(date.getFullYear());
    // return `${month}/${day}/${year}`;
    return year;
  } catch (err) {
    return 'Invalid Date';
  }
}

function Picker({ onChange, value, min, max }: PickerProps) {
  const [date, setDate] = useState(init(value));
  const handleChange = (v: any) => {
    setDate(v);
    onChange(formatDate(v));
  };
  return (
    <div>
      <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat='yyyy'
        showYearPicker
        minDate={min}
        maxDate={max}
        inline
      />
    </div>
  );
}

export default InputYear;
