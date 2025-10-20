import clsx from 'clsx';
import { ISelectOption } from '../types';

interface Props {
  name: string;
  error?: string;
  required?: boolean;
  onChange: (newValue: string) => void;
  value: string;
  placeholder?: string;
  options: ISelectOption[];
}

function InlineSelect({
  name,
  error,
  onChange,
  value,
  placeholder,
  options,
}: Props) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(target.value);
  };
  return (
    <select
      className={clsx(
        'form-select w-full h-10 rounded',
        'text-sm leading-4',
        'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
        'disabled:bg-fill-disabled disabled:text-disabled',
        error
          ? 'text-danger-base bg-danger-light border-danger-base'
          : 'border-outline focus:bg-primary-light focus:border-primary-base'
      )}
      title={name}
      onChange={handleChange}
      value={value}
    >
      <option value="">{placeholder ?? '- Select -'}</option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default InlineSelect;
