import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './InputDateRange.css';
import { IValue } from './DateRange';
import { LooseValue } from '@wojtekmaj/react-daterange-picker/dist/cjs/shared/types';

interface Props {
  onChange: (v: Partial<IValue> | null) => void;
  value: LooseValue;
}

const InputDateRange = ({ onChange, value }: Props) => {
  const handleChange = (v: any) => {
    if (!v) {
      onChange(null);
      return;
    }
    const date_from = format(v[0]);
    const date_to = format(v[1]);
    onChange({ date_from, date_to, filter: 'date_range' });
  };

  return (
    <DateRangePicker
      onChange={handleChange}
      value={value}
      monthPlaceholder="MM"
      monthAriaLabel="Month"
      dayPlaceholder="DD"
      dayAriaLabel="Day"
      yearPlaceholder="YYYY"
      yearAriaLabel="Year"
      className="rounded bg-fill-light flex-1 px-2"
    />
  );
};

export default InputDateRange;

const format = (date: Date) => {
  const isoFormattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return isoFormattedDate;
};
