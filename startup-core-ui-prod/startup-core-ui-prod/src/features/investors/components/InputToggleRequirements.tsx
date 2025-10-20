import useRequirementOptions from 'features/cms-requirements/hooks/useRequirementOptions';
import { InputShell, useFormContext } from 'ui/forms';
import { ISelectOption } from 'ui/forms/types';

type Props = {
  name: string;
  label: string;
};

function InputToggleRequirements({ name, label }: Props) {
  const { values, errors, setFieldValue } = useFormContext();
  const error = errors?.[name] as string;

  const value = values[name] || [];
  const handleChange =
    (row: ISelectOption) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(
        name,
        e.target.checked
          ? value.concat([row.value])
          : value.filter((x: string) => x !== row.value)
      );
    };
  const [isRequirementOptionsLoading, requirementOptions] =
    useRequirementOptions();
  return (
    <InputShell
      label={
        <>
          <span>{label} </span>
          <span className="divide-x">
            <a
              className="px-2 text-primary-base underline"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setFieldValue(
                  name,
                  requirementOptions.map((x) => x.value)
                );
              }}
            >
              Select All
            </a>
            <a
              className="px-2 text-primary-base underline"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setFieldValue(name, []);
              }}
            >
              Select None
            </a>
          </span>
        </>
      }
      note={error}
      error={error}
    >
      <div className="grid grid-cols-2 gap-1">
        {(requirementOptions || []).length < 1 ? (
          <div className="text-center">
            {isRequirementOptionsLoading ? 'Laoding...' : 'No items.'}
          </div>
        ) : (
          (requirementOptions || []).map((item) => (
            <label className="flex space-x-1" key={item.value}>
              <input
                type="checkbox"
                className="form-checkbox rounded"
                onChange={handleChange(item)}
                checked={value.includes(item.value)}
                title="toggle"
              />
              <span className="font-semibold text-sm">{item?.label}</span>
            </label>
          ))
        )}
      </div>
    </InputShell>
  );
}

export default InputToggleRequirements;
