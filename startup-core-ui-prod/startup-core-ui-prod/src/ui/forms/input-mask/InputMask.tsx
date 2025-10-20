import React from 'react';
import { Props as MaskProps } from 'react-input-mask';
import { useFormContext } from '../hooks';
import InlineMask from '../inline-mask/InlineMask';
import InputShell from '../input-shell/InputShell';

interface Props extends MaskProps {
  name: string;
  label?: string;
  note?: string;
  mask: string;
}

function InputMask(props: Props) {
  const { name, label, required, note } = props;
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = (newValue: string) => {
    setFieldValue(name, newValue);
  };
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
    >
      <InlineMask
        {...props}
        onChange={handleChange}
        value={values[name] ?? ''}
        error={error}
      />
    </InputShell>
  );
}

export default InputMask;
