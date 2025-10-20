import clsx from 'clsx';
import React, { ReactNode, Ref } from 'react';
import Select, {
  ActionMeta,
  PropsValue,
  SelectInstance,
  SingleValue,
} from 'react-select';
import { ISelectOption } from 'ui/forms/types';

interface Props {
  className?: string;
  defaultValue?: ISelectOption;
  disabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isRtl?: boolean;
  isSearchable?: boolean;
  name?: string;
  value?: PropsValue<ISelectOption>;
  options?: ISelectOption[];
  label?: string | ReactNode | JSX.Element;
  onChange?: (
    newValue: SingleValue<ISelectOption>,
    actionMeta: ActionMeta<ISelectOption>
  ) => void | undefined;
  ref?: Ref<SelectInstance<ISelectOption>>;
}

const SelectSearch = ({
  disabled,
  isLoading,
  isClearable = true,
  isRtl,
  isSearchable = true,
  defaultValue,
  options,
  label,
  className,
  name,
  onChange,
  ref,
  value,
}: Props) => {
  return (
    <Select
      className={clsx('basic-select', className)}
      placeholder={label}
      defaultValue={defaultValue}
      isDisabled={disabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isRtl={isRtl}
      isSearchable={isSearchable}
      name={name}
      options={options}
      onChange={onChange}
      ref={ref}
      value={value}
    />
  );
};

export default SelectSearch;
