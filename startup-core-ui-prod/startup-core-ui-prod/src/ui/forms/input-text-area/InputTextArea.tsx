import clsx from 'clsx';
import React from 'react';
import { useFormContext } from '../hooks';
import InputShell from '../input-shell/InputShell';

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: string;
  label?: string;
  note?: string;
}

function InputTextArea({ name, label, required, note, ...rest }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(name, target.value);
  };
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
    >
      <textarea
        className={clsx(
          'form-input w-full min-h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error
            ? 'text-danger-base bg-danger-light border-danger-base'
            : 'border-outline focus:bg-primary-light focus:border-primary-base'
        )}
        title={label}
        required={required}
        onChange={handleChange}
        value={values[name] ?? ''}
        rows={4}
        {...rest}
      />
    </InputShell>
  );
}

export default InputTextArea;
