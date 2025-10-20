import { useRef, useState } from 'react';
import { HiCalendar } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import { useFormContext } from './hooks';
import InlineInputMask from './InlineInputMask';
import InputShell from './InputShell';
import Dropdown from '../dropdown/Dropdown';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  note?: string;
  value?: string;
  customError?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function InputDate(props: Props) {
  const { name, label, required, note, value, onChange, customError, disabled } = props;
  const { values, setFieldValue, errors } = useFormContext();
  const dropdownRef = useRef<any>(null);
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
      return;
    }
    setFieldValue(name, newValue);
  };
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
      <InputShell
        label={`${label}`}
        note={error ?? note}
        optional={!required}
        error={error}
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
      >
        <InlineInputMask
          name={name}
          mask='99/99/9999'
          onChange={handleChange}
          value={value ?? values[name] ?? ''}
          error={error}
          disabled={disabled}
        />
      </InputShell>
      <div className='relative z-10'>
        <Dropdown ref={dropdownRef} alignment='left' width='auto'>
          <div className='bg-white'>
            <Picker onChange={handlePick} value={value ?? values[name] ?? ''} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

interface PickerProps {
  onChange: (v: string) => void;
  value: string;
}

const init = (v: string) => {
  return !isNaN(Date.parse(v)) ? new Date(v) : new Date();
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

function Picker({ onChange, value }: PickerProps) {
  const [date, setDate] = useState(init(value));
  const handleChange = (v: any) => {
    setDate(v);
    onChange(formatDate(v));
  };
  return (
    <div>
      <DatePicker selected={date} onChange={handleChange} inline />
    </div>
  );
}

export default InputDate;
