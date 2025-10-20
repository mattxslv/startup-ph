import React, { ComponentProps } from 'react';
import { InputSelect } from 'ui/forms';
import useDatasetCommonOptions from '../hooks/useDatasetCommonOptions';

interface Props extends Omit<ComponentProps<typeof InputSelect>, 'options'> {
  code: string;
}

function InputDatasetCommonOptions({ code, ...rest }: Props) {
  const [isLoading, options] = useDatasetCommonOptions(code);
  return (
    <InputSelect
      {...rest}
      placeholder={isLoading ? '- Loading -' : rest.placeholder}
      options={options}
    />
  );
}

export default InputDatasetCommonOptions;
