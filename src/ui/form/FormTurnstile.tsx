import React, { useEffect } from 'react';
import { useFormContext } from './hooks';
import { TurnstileWidget } from '../turnstile';
import InputShell from './InputShell';

interface Props {
  name: string;
  label?: string;
  note?: string;
  className?: string;
  required?: boolean;
}

function FormTurnstile({ name, label, note, className, required }: Props) {
  const { setFieldValue, errors } = useFormContext();
  const error = errors?.[name] as string;

  // Reset token when component unmounts
  useEffect(() => {
    return () => {
      setFieldValue(name, null);
    };
  }, [name, setFieldValue]);

  return (
    <InputShell label={label} note={error ?? note} optional={!required} error={error}>
      <div className={className || 'flex justify-center'}>
        <TurnstileWidget onTokenChange={(token) => setFieldValue(name, token)} />
      </div>
    </InputShell>
  );
}

export default FormTurnstile;
