import { ComponentProps } from 'react';
import { InputSelectAddress } from 'ui/forms';
import useAddressOptions from '../hooks/useAddressOptions';

interface Props
  extends Omit<ComponentProps<typeof InputSelectAddress>, 'options'> {
  type: string;
  isDisabled?: boolean;
  FILTER: any;
}

function InputAddressOptions({ type, isDisabled, FILTER, ...rest }: Props) {
  const [isLoading, options] = useAddressOptions(type, FILTER);
  return (
    <InputSelectAddress
      {...rest}
      placeholder={isLoading ? '- Loading -' : rest.placeholder}
      options={options}
      disabled={isLoading || isDisabled}
    />
  );
}

export default InputAddressOptions;
