import InputTags from '@/ui/form/InputTags'
import React, { ComponentProps } from 'react'
import useDatasetOptions from './useDatasetOptions';

interface Props extends Omit<ComponentProps<typeof InputTags>, 'options'> {
  code: string
}

function InputDatasetTags({ code, ...rest }: Props) {
  const { data } = useDatasetOptions(code);
  return (
    <InputTags
      {...rest}
      options={data?.options || []}
    />
  )
}

export default InputDatasetTags