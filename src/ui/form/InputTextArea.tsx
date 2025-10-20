import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { useFormContext } from './hooks';
import InputShell from './InputShell';

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: string;
  label?: string;
  note?: string;
  maxCounter?: number;
}

function InputTextArea({ name, label, required, note, maxCounter, ...rest }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { values, setFieldValue, errors, setFieldError } = useFormContext();
  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(name, target.value);
  };
  const val = values?.[name] || '';
  const isMaxLengthReached = useMemo(() => {
    if (typeof maxCounter !== 'number') return false;
    return val.length > maxCounter;
  }, [val, maxCounter]);
  useEffect(() => {
    if (isMaxLengthReached && setFieldError) {
      setFieldError(name, 'Too long');
      return () => {
        setFieldError(name, undefined);
      };
    }
  }, [name, isMaxLengthReached, setFieldError]);
  useEffect(() => {
    const fn = () => {
      if (!inputRef.current) return;
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current?.scrollHeight}px`;
    };
    inputRef.current?.addEventListener('input', fn);
    return () => {
      // eslint-disable-next-line
      inputRef.current?.removeEventListener('input', fn);
    };
    // eslint-disable-next-line
  }, [inputRef.current]);
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={typeof maxCounter === 'number' ? `${label} (${val.length} of ${maxCounter})` : label}
      note={error ?? note}
      optional={!required}
      error={error}
    >
      <textarea
        name={name}
        ref={inputRef}
        className={clsx(
          'form-input w-full min-h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled resize-none',
          error
            ? 'text-danger bg-danger-light border-danger'
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
