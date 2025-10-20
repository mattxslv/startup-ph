import clsx from 'clsx';

interface Props {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function Label({ icon, children, className }: Props) {
  return (
    <span
      className={clsx('flex items-start space-x-1 text-description', className)}
    >
      {icon ? <span>{icon}</span> : null}
      <span className="text-sm font-bold text-slate-900 leading-4">
        {children}
      </span>
    </span>
  );
}

export default Label;
