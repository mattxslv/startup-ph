import clsx from 'clsx';

interface Props {
  name: string;
  error?: string;
  required?: boolean;
  onChange: (newValue: string) => void;
  value: string | number;
  placeholder?: string;
}

function InlineInput({ name, error, onChange, value, placeholder }: Props) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };
  return (
    <input
      className={clsx(
        'form-input w-full h-10 rounded',
        'text-sm leading-4',
        'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
        'disabled:bg-fill-disabled disabled:text-disabled',
        error
          ? 'text-danger-base bg-danger-light border-danger-base'
          : 'border-outline focus:bg-primary-light focus:border-primary-base'
      )}
      type="text"
      title={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value ?? ''}
    />
  );
}

export default InlineInput;
