import clsx from "clsx";
import Mask, { Props as MaskProps } from "react-input-mask";

interface Props extends Omit<MaskProps, "onChange"> {
  name: string;
  label?: string;
  mask: string | (string | RegExp)[];
  error?: string;

  onChange: (s: string) => void;
}

function InlineMask({
  label,
  error,
  onChange,

  value,
  required,
  mask,
  ...rest
}: Props) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };
  return (
    <Mask
      className={clsx(
        "form-input w-full h-10 rounded",
        "text-sm leading-4",
        "placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent",
        "disabled:bg-fill-disabled disabled:text-disabled",
        error
          ? "text-danger bg-danger-light border-danger"
          : "border-outline focus:bg-primary-light focus:border-primary-base"
      )}
      type="text"
      title={label}
      required={required}
      onChange={handleChange}
      value={value}
      mask={mask}
      {...rest}
    />
  );
}

export default InlineMask;
