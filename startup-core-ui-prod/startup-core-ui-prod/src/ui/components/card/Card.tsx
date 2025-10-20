import clsx from 'clsx';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function Card({ className, children, ...rest }: Props) {
  return (
    <div
      className={clsx('bg-white rounded-lg border p-6', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
