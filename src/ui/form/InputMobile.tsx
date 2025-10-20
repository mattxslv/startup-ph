import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useFormContext } from './hooks';
import InputShell from './InputShell';

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  label?: string;
  note?: string;
  trailing?: React.ReactNode;
}

const Input = React.forwardRef<any>((props, ref) => {
  return <input ref={ref} title='mobile-input' {...props} />;
});

const DIVIDER_STYLE = {
  fontSize: '1px',
  backgroundColor: 'currentColor',
  color: 'inherit',
};

function getSelectedOption(options: any, value: any) {
  for (const option of options) {
    if (!option.divider && option.value === value) {
      return option;
    }
  }
}

function CountrySelect({ value, onChange, options, ...rest }: any) {
  const onChange_ = useCallback(
    (event: any) => {
      const value = event.target.value;
      onChange(value === 'ZZ' ? undefined : value);
    },
    [onChange]
  );

  const selectedOption = useMemo(() => {
    return getSelectedOption(options, value);
  }, [options, value]);

  // "ZZ" means "International".
  // (HTML requires each `<option/>` have some string `value`).
  return (
    <div>
      <select {...rest} tabIndex='-1' value={value || 'ZZ'} onChange={onChange_}>
        {options.map(({ value, label, divider }: any) => (
          <option
            key={divider ? '|' : value || 'ZZ'}
            value={divider ? '|' : value || 'ZZ'}
            disabled={divider ? true : false}
            style={divider ? DIVIDER_STYLE : undefined}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CountrySelectWithIcon({
  value,
  options,
  className,
  iconComponent: Icon,
  getIconAspectRatio,
  arrowComponent: Arrow = <div className='PhoneInputCountrySelectArrow' />,
  unicodeFlags,
  ...rest
}: any) {
  const selectedOption = useMemo(() => {
    return getSelectedOption(options, value);
  }, [options, value]);
  return (
    <div className='PhoneInputCountry'>
      <CountrySelect
        {...rest}
        value={value}
        options={options}
        className={clsx('PhoneInputCountrySelect', className)}
      />
      <div className='PhoneInputCountryIconUnicode'>
        <Icon aria-hidden country={value} label={selectedOption && selectedOption.label} />
      </div>
    </div>
  );
}

Input.displayName = 'MobileInput';
CountrySelect.displayName = 'MobileSelect';

function InputMobile({
  name,
  label,
  required,
  note,
  trailing,
  className,
  disabled,
  ...rest
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const handleChange = (newValue: string) => {
    setFieldValue(name, newValue);
  };
  const error = errors?.[name] as string;
  const value = values[name] ?? '';
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
      trailing={trailing}
    >
      <PhoneInput
        international
        inputComponent={Input}
        countrySelectComponent={CountrySelectWithIcon}
        numberInputProps={{
          className: clsx(
            'form-input w-full h-10 rounded',
            'text-sm leading-4',
            'placeholder:text-muted focus:ring-outline-active focus:ring-2 focus:border-transparent',
            'disabled:bg-fill-disabled disabled:text-disabled',
            error
              ? 'text-danger bg-danger-light border-danger'
              : 'border-outline focus:bg-primary-light focus:border-primary-base',
            className
          ),
        }}
        defaultCountry='PH'
        countryCallingCodeEditable={false}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {/* <input
        className={clsx(
          'form-input w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-muted focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error ? 'text-danger bg-danger-light border-danger' : 'border-outline focus:bg-primary-light focus:border-primary-base',
          className
        )}
        type="text"
        title={label}
        required={required}
        onChange={handleChange}
        value={values[name] ?? ''}
        {...rest}
      /> */}
    </InputShell>
  );
}

export default InputMobile;
