import { Switch } from '@headlessui/react';
import { HiLockClosed } from 'react-icons/hi';

interface Props {
  onChange: (newValue: boolean) => void;
  value: boolean;
  disabled?: boolean;
  label?: string;
}

function InlineToggle({ onChange, value, disabled, label }: Props) {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      disabled={disabled}
      className={`${
        value ? 'bg-success disabled:bg-fill-disabled' : 'bg-fill-dark disabled:bg-fill-light'
      } relative inline-flex h-7 w-[50px] items-center rounded-full transition group`}
    >
      <span className='sr-only'>{label ?? 'Toggle'}</span>
      <span
        className={`${
          value ? 'translate-x-[26px]' : 'translate-x-1'
        } inline-block h-5 w-5 transform rounded-full bg-white transition ds-toggle-shadow-a`}
      >
        <span className='ds-toggle-shadow-b absolute inset-0 rounded-full flex items-center justify-center group-disabled:text-disabled group-disabled:cursor-not-allowed'>
          {disabled ? <HiLockClosed /> : null}
        </span>
      </span>
    </Switch>
  );
}

export default InlineToggle;
