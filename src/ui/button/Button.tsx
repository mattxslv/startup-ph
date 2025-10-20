import clsx from 'clsx';
import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  variant?: 'primary' | 'outline' | 'link' | 'dark' | 'light' | 'danger';
  size?: 'xs' | 'sm' | 'lg' | 'base';
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const MAP_VARIANT = {
  primary: 'bg-gradient-to-r from-[#071BCC] to-[#5B21B6] text-white',
  outline: 'outline outline-primary text-primary',
  link: 'text-[#2D3132]',
  dark: 'bg-dark text-white',
  light: 'bg-white text-primary',
  danger: 'bg-danger text-white',
};

const MAP_SIZE = {
  xs: 'h-[32px] px-2 rounded text-[12px] space-x-2',
  sm: 'h-[42px] px-4 rounded text-[15px] space-x-2',
  base: 'h-[48px] px-6 rounded-md text-[15px] space-x-2',
  lg: 'h-[58px] px-8 rounded-md text-[15px] space-x-2',
};

function Button({
  className,
  children,
  variant = 'outline',
  size = 'base',
  leading,
  trailing,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(
        MAP_SIZE[size],
        MAP_VARIANT[variant],
        'disabled:opacity-50',
        'font-bold whitespace-nowrap flex items-center justify-center',
        'focus:outline-none focus:ring-primary focus:ring-2 focus:border-transparent',
        className
      )}
      type='button'
      {...rest}
    >
      {leading}
      <span>{children}</span>
      {trailing}
    </button>
  );
}

export default Button;
