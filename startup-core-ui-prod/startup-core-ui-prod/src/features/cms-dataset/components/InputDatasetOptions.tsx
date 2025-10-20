import React, { ComponentProps } from 'react';
import { InputSelect } from 'ui/forms';
import useDatasetOptions from '../hooks/useDatasetOptions';

interface Props extends Omit<ComponentProps<typeof InputSelect>, 'options'> {
  code: string;
}

function InputDatasetOptions({ code, ...rest }: Props) {
  const [isLoading, options] = useDatasetOptions(code);
  return (
    <InputSelect
      {...rest}
      placeholder={isLoading ? '- Loading -' : rest.placeholder}
      options={options}
    />
  );
}

export default InputDatasetOptions;
