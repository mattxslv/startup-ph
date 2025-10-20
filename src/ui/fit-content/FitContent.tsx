import clsx from 'clsx'

interface Props {
  className?: string
  children: React.ReactNode
}

function FitContent({ className, children }: Props) {
  return (
    <div className="flex-1 relative">
      <div className={clsx('absolute inset-0 overflow-auto -m-[1px] p-[1px]', className)}>
        {children}
      </div>
    </div>
  )
}

export default FitContent
