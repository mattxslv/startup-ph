import clsx from 'clsx';

interface Props {
  className?: string;
  variant?:
    | 'base'
    | 'primary'
    | 'outlinePrimary'
    | 'neutralPrimary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info';
  rounded?: boolean;
  children?: React.ReactNode;
  leading?: JSX.Element | (() => JSX.Element);
  trailing?: JSX.Element | (() => JSX.Element);
}

const MAP_VARIANT_CLASS = {
  base: 'bg-fill-dark text-black border-fill-dark',
  primary: 'bg-primary-base text-white border-primary-base',
  warning: 'bg-warning-base text-white border-warning-base',
  outlinePrimary: 'bg-transparent text-primary-base border-primary-base ',
  neutralPrimary: 'bg-primary-light text-primary-base border-primary-light',
  success: 'bg-success-base text-white border-success-base',
  danger: 'bg-danger-base text-white border-danger-base',
  info: 'bg-info-base text-white border-info-base',
};

function Badge({
  className,
  variant,
  children,
  rounded,
  leading,
  trailing,
}: Props) {
  return (
    <div
      className={clsx(
        'inline-flex items-center',
        'h-[20px] px-1',
        'text-xs font-semibold',
        'border',
        rounded ? 'rounded-full' : 'rounded',
        MAP_VARIANT_CLASS[variant ?? 'base'],
        className,
        'space-x-1'
      )}
    >
      <>
        {leading}
        {children ? (
          <span className="whitespace-nowrap">{children}</span>
        ) : null}
        {trailing}
      </>
    </div>
  );
}

export default Badge;
