import React from "react";
import { Props as MaskProps } from "react-input-mask";
import { useFormContext } from "./hooks";
import InlineMask from "./InlineInputMask";

import InputShell from "./InputShell";

interface Props extends MaskProps {
  name: string;
  label?: string;
  note?: React.ReactNode;
  mask: string | (string | RegExp)[];
  reset?: boolean;
}

function InputMask(props: Props) {
  const { name, label, required, note, reset } = props;
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = (newValue: string) => {
    setFieldValue(name, newValue);
  };
  const handleReset = () => {
    setFieldValue(name, "");
  };
  const error = errors?.[name] as string;
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
      reset={reset}
      handleReset={handleReset}>
      <InlineMask
        {...props}
        onChange={handleChange}
        value={values[name] ?? ""}
        error={error}
      />
    </InputShell>
  );
}

export default InputMask;
