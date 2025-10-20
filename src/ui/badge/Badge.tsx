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
  children: React.ReactNode;
  leading?: JSX.Element | (() => JSX.Element);
  trailing?: JSX.Element | (() => JSX.Element);
}

const MAP_VARIANT_CLASS = {
  base: 'bg-slate-200 text-black border-slate-200',
  info: 'bg-[#F8E8FB] text-[#9E28B2] text-black border-[#F8E8FB]',
  primary: 'bg-[#DCE4FF] text-primary border-[#DCE4FF]',
  warning: 'bg-[#FFFCF2] text-[#FFB803] border-[#FFFCF2]',
  outlinePrimary: 'bg-transparent text-primary border-primary ',
  neutralPrimary: 'bg-primary-light text-primary border-primary-light',
  success: 'bg-[#EAFFED] text-[#33BB48] border-[#EAFFED]',
  danger: 'text-danger bg-red-50',
};

function Badge({ className, variant, children, rounded = true, leading, trailing }: Props) {
  return (
    <div
      className={clsx(
        'inline-flex items-center',
        'py-0.5 px-3',
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
        {children ? <span className='whitespace-nowrap'>{children}</span> : null}
        {trailing}
      </>
    </div>
  );
}

export default Badge;
