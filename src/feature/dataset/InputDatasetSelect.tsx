import InputSelect from '@/ui/form/InputSelect'
import React, { ComponentProps } from 'react'
import useDatasetOptions from './useDatasetOptions';

interface Props extends Omit<ComponentProps<typeof InputSelect>, 'options'> {
  code: string
}

function InputDatasetSelect({ code, ...rest }: Props) {
  const { data } = useDatasetOptions(code);
  return (
    <InputSelect
      {...rest}
      options={data?.options || []}
    />
  )
}

export default InputDatasetSelect