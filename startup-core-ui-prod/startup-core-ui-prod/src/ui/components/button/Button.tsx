import clsx from 'clsx';
import React from 'react';

export type TButtonVariants =
  | 'primary'
  | 'neutralPrimary'
  | 'outlinePrimary'
  | 'base'
  | 'success'
  | 'warning'
  | 'danger'
  | 'link'
  | 'dark';

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  variant?: TButtonVariants;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  leadingIcon?: JSX.Element | (() => JSX.Element);
  trailingIcon?: JSX.Element | (() => JSX.Element);
}

const MAP_SIZE_CLASS = {
  xs: 'min-h-[24px] px-1 text-xs rounded',
  sm: 'min-h-[32px] px-3 text-xs rounded',
  base: 'min-h-[40px] px-4 text-xs rounded',
  lg: 'min-h-[48px] px-5 text-xs rounded',
};

const MAP_VARIANT_CLASS = {
  base: 'shadow-sm text-black bg-fill-light hover:bg-fill-dark',
  primary:
    'shadow-sm text-white bg-primary-base border-primary-base hover:bg-primary-dark hover:ring hover:ring-offset-1 hover:ring-transparent',
  warning:
    'shadow-sm text-white bg-warning-base border-warning-base hover:bg-warning-dark hover:ring hover:ring-offset-1 hover:ring-transparent',
  success:
    'shadow-sm text-white bg-success-base border-success-base hover:bg-success-dark hover:ring hover:ring-offset-1 hover:ring-transparent',
  neutralPrimary: 'shadow-sm text-primary-base bg-fill-dark hover:bg-gray-200',
  outlinePrimary:
    'shadow-sm text-primary-base border-primary-base bg-primary-light hover:bg-fill-dark',
  danger: 'shadow-sm text-danger-base bg-fill-light hover:bg-fill-dark',
  link: 'text-primary-base bg-transparent border-transparent hover:bg-fill-dark',
  dark: 'text-white bg-black hover:bg-gray-800',
};

function Button({
  className,
  children,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  ...rest
}: IButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        className,
        'inline-flex justify-center items-center border font-semibold transition truncate',
        'focus:outline-none active:shadow-active focus:z-10',
        MAP_SIZE_CLASS[size ?? 'base'],
        MAP_VARIANT_CLASS[variant ?? 'base'],
        'disabled:bg-fill-disabled disabled:border-outline disabled:text-disabled disabled:ring-transparent',
        'space-x-2'
      )}
      type="button"
      {...rest}
    >
      <>
        {leadingIcon}
        {children ? <span>{children}</span> : null}
        {trailingIcon}
      </>
    </button>
  );
}

export default Button;
