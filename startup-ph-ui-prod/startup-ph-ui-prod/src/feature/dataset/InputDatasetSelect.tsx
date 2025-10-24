import InputSelect from '@/ui/form/InputSelect'
import React, { ComponentProps } from 'react'
import useDatasetOptions from './useDatasetOptions';

interface Props extends Omit<ComponentProps<typeof InputSelect>, 'options'> {
  code: string;
  fallbackOptions?: { label: string; value: string; }[];
}

function InputDatasetSelect({ code, fallbackOptions = [], ...rest }: Props) {
  const { data, isLoading, error } = useDatasetOptions(code);
  
  // Use fallback options if API data is empty or failed to load
  const options = (data?.options && data.options.length > 0) ? data.options : fallbackOptions;
  
  return (
    <InputSelect
      {...rest}
      options={options}
    />
  )
}

export default InputDatasetSelect