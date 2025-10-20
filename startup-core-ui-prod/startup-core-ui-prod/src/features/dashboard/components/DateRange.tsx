import { Button } from 'ui/components';

interface Props {
  onChange: (v: Partial<IValue>) => void;
  value: Partial<IValue>;
}

export interface IValue {
  filter:
    | 'all_time'
    | 'current_day'
    | 'current_month'
    | 'current_year'
    | 'date_range';
  date_from: string;
  date_to: string;
}

function DateRange({ onChange, value }: Props) {
  return (
    <div className="space-x-[-1px]">
      <Button
        className="rounded-r-none"
        onClick={() =>
          onChange({ filter: 'all_time', date_from: '', date_to: '' })
        }
        variant={value.filter === 'all_time' ? 'neutralPrimary' : 'base'}
      >
        All time
      </Button>
      <Button
        className="rounded-r-none"
        onClick={() =>
          onChange({ filter: 'current_day', date_from: '', date_to: '' })
        }
        variant={value.filter === 'current_day' ? 'neutralPrimary' : 'base'}
      >
        Day
      </Button>
      <Button
        className="rounded-none"
        onClick={() =>
          onChange({ filter: 'current_month', date_from: '', date_to: '' })
        }
        variant={value.filter === 'current_month' ? 'neutralPrimary' : 'base'}
      >
        Month
      </Button>
      <Button
        className="rounded-l-none"
        onClick={() => onChange({ filter: 'current_year' })}
        variant={value.filter === 'current_year' ? 'neutralPrimary' : 'base'}
      >
        Year
      </Button>
    </div>
  );
}

export default DateRange;
