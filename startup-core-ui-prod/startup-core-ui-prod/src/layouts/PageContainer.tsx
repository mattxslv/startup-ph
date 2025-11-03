import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function PageContainer({ children, className }: Props) {
  return (
    <div
      className={clsx('p-6 flex flex-col flex-1 w-full', className)}
    >
      {children}
    </div>
  );
}

export default PageContainer;
