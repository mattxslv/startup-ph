import useDatasetOptions from 'features/cms-dataset/hooks/useDatasetOptions';
import { InputSelect } from 'ui/forms';

interface Props {
  name: string;
  label: string;
  required?: boolean;
}

const SelectAgency = ({ name, label, required }: Props) => {
  const [isLoading, options] = useDatasetOptions('agency');
  return (
    <InputSelect
      name={name}
      label={label}
      required={required}
      options={options}
    />
  );
};

export default SelectAgency;
