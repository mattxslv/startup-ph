import useDatasetOptions from 'features/cms-dataset/hooks/useDatasetOptions';
import { InputSelect } from 'ui/forms';
import useRoleOptions from '../../role-permissions/hooks/useRoleOptions';

interface Props {
  name: string;
  label: string;
  required?: boolean;
}

const SelectRole = ({ name, label, required }: Props) => {
  const [isLoading, options] = useRoleOptions();
  return (
    <InputSelect
      name={name}
      label={label}
      required={required}
      options={options}
    />
  );
};

export default SelectRole;
